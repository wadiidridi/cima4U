// movie.component.ts
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movieDetails: any;
  movies: any[] = [];
  reviews: any[] = [];
  active: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  page: { [key: string]: number } = {};

  constructor(
    private movieService: MovieService,
    private authService: AuthService // Ajoutez le service d'authentification ici
  ) {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnInit() {
    this.setActiveAndFetchMovies('top_rated');
  }

  changeMovieType(event: any) {
    const movieType = event.target.value;
    if (movieType) {
      this.setActiveAndFetchMovies(movieType);
    }
  }

  setActiveAndFetchMovies(movieType: string) {
    this.active = movieType;
    this.page[movieType] = 1;
    this.getMoviesByType(movieType, this.page[movieType]);
  }

  filterByDate() {
    // Réinitialisez la liste des films et la page actuelle
    this.movies = [];
    this.page[this.active!] = 1;

    // Obtenez la liste des films en fonction du type et des dates sélectionnées
    this.getMoviesByType(this.active!, this.page[this.active!]);
  }


  getMoviesByType(movieType: string, page: number) {
    console.log('Requested movie type:', movieType);
    this.movieService.getMovies(movieType, page).subscribe(
      (data: any) => {
        // Append new movies to the existing list
        this.movies = [...this.movies, ...data.results.map((movie: any) => ({
          movieDetails: movie
        }))];
        console.log(this.movies);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    console.log('dfddddddddddddddddddd');
    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.page[this.active!]++;
      this.getMoviesByType(this.active!, this.page[this.active!]);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  logout() {
    // Appel de la méthode de déconnexion du service d'authentification
    this.authService.logout();
  }
}
