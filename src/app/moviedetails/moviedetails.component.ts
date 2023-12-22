// moviedetails.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  movieId: number = 0;
  movieDetails: any;
  reviews: any[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];

      this.movieService.getMovieDetails(this.movieId).subscribe(
        (data: any) => {
          this.movieDetails = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
      this.movieService.getMovieReviews(this.movieId).subscribe(
        (data: any) => {
          this.reviews = data.results;
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
  }
  toggleFavorite() {
    const isFavorite = this.movieDetails.favorite || false; // Default to false if not set
  
    this.movieService.toggleFavorite(this.movieId, !isFavorite).subscribe(
      (res) => {
        // Mettez à jour l'état local du film
        this.movieDetails.favorite = !isFavorite;
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
