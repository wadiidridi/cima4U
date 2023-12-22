// favoritemovie.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteMovieService } from '../services/favoritemovie.service';

@Component({
  selector: 'app-favoritemovie',
  templateUrl: './favoritemovie.component.html',
  styleUrls: ['./favoritemovie.component.css']
})
export class FavoritemovieComponent implements OnInit {
  accountId: string | null = null;
  favoriteMovies: any[] = [];

  constructor(
    private favoriteMovieService: FavoriteMovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Récupérer l'ID de session depuis sessionStorage
    const storedAccount = sessionStorage.getItem('account');

    // Vérifier si des informations sont stockées
    if (storedAccount) {
      // Les informations sont disponibles, les analyser en tant qu'objet JSON
      const account = JSON.parse(storedAccount);

      // Affecter l'ID à this.accountId
      this.accountId = account.session_id;

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

  getFavoriteMovies() {
    console.log(this.accountId);

    if (this.accountId) {
      this.favoriteMovieService.getFavoriteMovies(this.accountId).subscribe(
        (data: any) => {
          this.favoriteMovies = data.results;
          console.log(this.favoriteMovies);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
