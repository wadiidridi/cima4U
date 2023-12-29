// moviedetails.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { FavoriteMovieService } from '../services/favoritemovie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  movieId: number = 0;
  movieDetails: any;
  reviews: any[] = [];
video: any;
@ViewChild('videoCarousel') videoCarousel: any; // Ajoutez cette ligne

  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer, private movieService: MovieService,    private favoriteMovieService: FavoriteMovieService,
    ) {}
    nextVideo() {
      this.videoCarousel.next(); // Appel de la méthode Bootstrap Carousel pour passer à la vidéo suivante
    }
  
    prevVideo() {
      this.videoCarousel.prev(); // Appel de la méthode Bootstrap Carousel pour passer à la vidéo précédente
    }
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
          console.log('ssssssss',data);
          
        },
        (error: any) => {
          console.error(error);
        }
      );
      this.movieService.getMovieVideo(this.movieId).subscribe(
        (data: any) => {
          this.video = data.results;
          console.log('video',data);
          
        },
        (error: any) => {
          console.error(error);
        }
      );
      this.getFavoriteMovies()
    });
  }
  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  toggleFavorite(isfavorite: any) {
    this.movieService.toggleFavorite(this.movieId, isfavorite).subscribe(
      (res) => {
        // Mettez à jour l'état local du film
        console.log('yes', res);
        this.isfavorite = !this.isfavorite;
        // Vous pouvez ajouter des mises à jour d'interface utilisateur ici si nécessaire
      },
      (error: any) => {
        console.error('Erreur lors de la modification de l\'état des favoris :', error);
        // Gérez l'erreur, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }
  getVideoUrl(videoKey: string): SafeResourceUrl {
    const videoUrl = `https://www.youtube.com/embed/${videoKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
isfavorite :any ;
  getFavoriteMovies() {


    // Vérifier si des informations sont stockées
 
      // Affecter l'ID à this.accountId
       const  accountId = JSON.parse(sessionStorage.getItem('account')!).id;
    if (accountId) {
      this.favoriteMovieService.getFavoriteMovies(accountId).subscribe(
        (data: any) => {
    console.log(data);
    
for (let movie of data.results) {
  
 if (this.movieId==movie.id)


  this.isfavorite=true
}
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  hasUserRated(review: any): boolean {
    // Votre logique pour vérifier si l'utilisateur a noté le film
    // Utilisez les informations de session ou d'authentification
    // pour comparer avec l'auteur de la critique
    return false;
  }
}

