// favorite-movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {
  private apiKey = '7266d7a9bc26929fc9383d6010730245';
session_id=JSON.parse(sessionStorage.getItem('sessionData')!).session_id
  constructor(private http: HttpClient) {}

  getFavoriteMovies(accountId: string ): Observable<any> {
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${this.apiKey}&session_id=${this.session_id}`;
    return this.http.get(url);
  }
}
