// favoritemovie.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteMovieService } from '../services/favoritemovie.service';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-favoritemovie',
  templateUrl: './favoritemovie.component.html',
  styleUrls: ['./favoritemovie.component.css']
})
export class FavoritemovieComponent implements OnInit {
  accountId: string | null = null;
  movieDetails: any;
  movieId: number = 0;

  favoriteMovies: any[] = [];
  movies: any[] = [];
  isfavorite :any[] = [] ;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private authService: AuthService,    private favoriteMovieService: FavoriteMovieService,

  ) {}

  ngOnInit() {
    // Récupérer l'ID de session depuis sessionStorage
    const storedAccount = sessionStorage.getItem('account');

    // Vérifier si des informations sont stockées
    if (storedAccount) {
      // Les informations sont disponibles, les analyser en tant qu'objet JSON
      const account = JSON.parse(storedAccount);

      // Affecter l'ID à this.accountId
      this.accountId = account.id;

      // Vérifier si l'ID est disponible et appeler la fonction pour obtenir les films favoris
      if (this.accountId) {
        this.getFavoriteMovies();
      } else {
        console.error('Account ID not found in session.');
      }
    } else {
      console.error('No session information available.');
    }
    
  }
  toggleFavorite(movieId : any,isfavorite:any) {
    console.log('gfdhthth',movieId);
    
     this.movieService.toggleFavorite(movieId, isfavorite).subscribe(
       (res) => {
      
   this.movies =  this.movies.filter(movie => movie.id != movieId);
   
   setTimeout(()=>{console.log(this.movies)},2000)   
         console.log('yes',res);
         // Vous pouvez ajouter des mises à jour d'interface utilisateur ici si nécessaire
       },
       (error: any) => {
         console.error('Erreur lors de la modification de l\'état des favoris :', error);
         // Gérez l'erreur, par exemple, affichez un message d'erreur à l'utilisateur
       }
     );
   }
  getFavoriteMovies() {
    console.log(this.accountId);

    if (this.accountId) {
      this.favoriteMovieService.getFavoriteMovies(this.accountId).subscribe(
        (data: any) => {
          this.favoriteMovies = data.results;
          console.log(this.favoriteMovies);
          this.movies = [...this.movies, ...data.results.map((movie: any) => ({ movieDetails: movie }))];

        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
