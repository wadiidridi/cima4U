import { Component, Input, OnInit, HostListener } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { FavoriteMovieService } from '../services/favoritemovie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movieDetails: any;
  movies: any[] = [];
  active: string | null = null;
  page: { [key: string]: number } = {};
  searchTitle: string = '';
  movieId: number = 0;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private authService: AuthService,    private favoriteMovieService: FavoriteMovieService,

  ) {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnInit() {
    this.setActiveAndFetchMovies('popular');

    // Utilisez debounceTime et distinctUntilChanged pour éviter les recherches excessives
    this.movieService.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTitle: string) => {
        // Réinitialisez la liste des films et la page actuelle
        this.movies = [];
        this.page[this.active!] = 1;
        // Obtenez la liste des films filtrés en fonction du type, de la page et du titre de recherche
        return this.getMoviesByTypeAndTitle(this.active!, this.page[this.active!], searchTitle);
      })
    ).subscribe();
    this.getFavoriteMovies()

  }

  onSearchInput(event: Event) {
    const searchTitle = (event.target as HTMLInputElement)?.value;
    this.searchTitle = searchTitle;
    this.page[this.active!] = 1;
    this.getMoviesByType(this.active!, this.page[this.active!]);
  }
  
  sortByDate(order: 'oldest' | 'newest') {
    this.movies.sort((a: any, b: any) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
  
      if (order === 'oldest') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }

  changeMovieType(movieType: string) {
    this.setActiveAndFetchMovies(movieType);
  }

  setActiveAndFetchMovies(movieType: string) {
    this.active = movieType;
    this.page[movieType] = 1;
    this.getMoviesByType(movieType, this.page[movieType]);
  }

  getMoviesByType(movieType: string, page: number) {
    this.movieService.getMovies(movieType, page, this.searchTitle).subscribe(
      (data: any) => {
        // Réinitialisez la liste des films si c'est la première page
        if (page === 1) {
          this.movies = [];
        }
        // Ajoutez les nouveaux films à la liste existante
        this.movies = [...this.movies, ...data.results.map((movie: any) => ({ movieDetails: movie }))];
      console.log(data);
      
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  getMoviesByTypeAndTitle(movieType: string, page: number, searchTitle: string) {
    return this.movieService.getMovies(movieType, page, searchTitle).pipe(
      tap(data => {
        // Append new movies to the existing list
        this.movies = [...this.movies, ...data.results.map((movie: any) => ({ movieDetails: movie }))];
      }),
      switchMap(data => {
        // Return an observable to satisfy switchMap
        return of(data);
      }),
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.page[this.active!]++;
      this.getMoviesByType(this.active!, this.page[this.active!]);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  logout() {
    this.authService.logout();
  }
  isfavorite :any[] = [] ;
  getFavoriteMovies() {


    // Vérifier si des informations sont stockées
 
      // Affecter l'ID à this.accountId
       const  accountId = JSON.parse(sessionStorage.getItem('account')!).id;
    if (accountId) {
      this.favoriteMovieService.getFavoriteMovies(accountId).subscribe(
        (data: any) => {
    console.log(data);
    
for (let movie of data.results) {
  


  this.isfavorite.push(movie.id)
}
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  toggleFavorite(movieId : any,isfavorite:any) {
   console.log('gfdhthth',movieId);
   
    this.movieService.toggleFavorite(movieId, isfavorite).subscribe(
      (res) => {
        // Mettez à jour l'état local du film
        if(isfavorite===true)
    this.isfavorite.push(movieId)
  else if(isfavorite===false)
  this.isfavorite =  this.isfavorite.filter(id => id !== movieId);
        console.log('yes',res);
        // Vous pouvez ajouter des mises à jour d'interface utilisateur ici si nécessaire
      },
      (error: any) => {
        console.error('Erreur lors de la modification de l\'état des favoris :', error);
        // Gérez l'erreur, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }
}
