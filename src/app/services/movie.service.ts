// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';  // Importez 'switchMap' depuis 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '7266d7a9bc26929fc9383d6010730245';
  private apiUrl = 'https://api.themoviedb.org/3/movie';
   private urlfavorite ='https://api.themoviedb.org/3/account/{account_id}/favorite/movies'
  private moviesCache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  getMoviesfavorite(movieType: string, page: number): Observable<any> {
    const url = `${this.urlfavorite}/${movieType}`;
    const params = { api_key: this.apiKey, page: page.toString() };

    // Vérifiez d'abord le cache local
    const cacheKey = `${movieType}-${page}`;
    if (this.moviesCache[cacheKey]) {
      return of(this.moviesCache[cacheKey]);
    }

    return this.http.get<any>(url, { params }).pipe(
      // Mettez en cache les données dans le stockage local
      tap(data => this.moviesCache[cacheKey] = data)
    );
  }

  getMovies(movieType: string, page: number): Observable<any> {
    const url = `${this.apiUrl}/${movieType}`;
    const params = { api_key: this.apiKey, page: page.toString() };

    // Vérifiez d'abord le cache local
    const cacheKey = `${movieType}-${page}`;
    if (this.moviesCache[cacheKey]) {
      return of(this.moviesCache[cacheKey]);
    }

    return this.http.get<any>(url, { params }).pipe(
      // Mettez en cache les données dans le stockage local
      tap(data => this.moviesCache[cacheKey] = data)
    );
  }
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/${movieId}`;
    const params = { api_key: this.apiKey };
  
    return this.http.get<any>(url, { params });
  }
  
  rateMovie(movieId: number, rating: number): Observable<any> {
    const url = `${this.apiUrl}/${movieId}/rating`;
    const body = { value: rating };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.post(url, body, { headers });
  }
  getMovieReviews(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/${movieId}/reviews`;
    const params = { api_key: this.apiKey };

    return this.http.get<any>(url, { params });
  }
 // movie.service.ts
// ...


toggleFavorite(movieId: number, isFavorite: boolean): Observable<any> {
  let sessionId = JSON.parse(sessionStorage.getItem('sessionData')!).session_id; // Add session ID here
  let accountId = JSON.parse(sessionStorage.getItem('account')!).id; // Add session ID here

  let favoriteUrl = `https://api.themoviedb.org/3/account/${accountId}/favorite`; // Update with your actual favorite API endpoint

  const url = `${favoriteUrl}?api_key=${this.apiKey}&session_id=${sessionId}`;
  const body = {
    media_type: 'movie',
    media_id: movieId,
    favorite: !isFavorite // Toggle the favorite status
  };
  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  return this.http.post(url, body, { headers }).pipe(
    tap(() => {
      // Actualisez le cache après avoir modifié l'état des favoris
      const cacheKey = `favorite-${movieId}`;
      this.moviesCache[cacheKey] = !isFavorite; // Mettez à jour le cache en fonction du nouvel état
    })
  );
}

// ...

  
  // getMoviesWithReviews(movieType: string, page: number): Observable<any> {
  //   return this.getMovies(movieType, page).pipe(
  //     switchMap((movies: any) => {
  //       const movieIds = movies.results.map((movie: any) => movie.id);
  //       const reviewsRequests = movieIds.map((movieId: number) => this.getMovieReviews(movieId));

  //       return forkJoin({
  //         movies: of(movies.results),
  //         reviews: forkJoin(reviewsRequests)
  //       });
  //     })
  //   );
  // }

}
