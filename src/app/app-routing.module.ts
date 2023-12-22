import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './guard/auth-gard.guard';
import { FavoritemovieComponent } from './favoritemovie/favoritemovie.component';

const routes: Routes = [
  {path : "", component: FooterComponent},

  {path : "login", component: FooterComponent},
  { path: '', redirectTo: '/movies', pathMatch: 'full' },

  // { path: 'movie/:id', component: MovieDetailComponent }, // Assurez-vous d'avoir une composante MovieDetailComponent pour afficher les détails du film
  {path : "movie", component: MovieComponent},
  { path: 'movie-details/:id', component: MoviedetailsComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard] // Utilisez le garde d'authentification pour protéger cette route
  },
  {
    path: 'favoritemovies', // Utilisez un chemin avec un paramètre
    component: FavoritemovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
