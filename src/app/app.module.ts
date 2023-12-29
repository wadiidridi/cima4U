import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './movie/movie.component'; // Assurez-vous d'importer HttpClientModule
import { MovieService } from './services/movie.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { HomeComponent } from './home/home.component';
import { FavoritemovieComponent } from './favoritemovie/favoritemovie.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    MovieComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    MoviedetailsComponent,
    HomeComponent,
    FavoritemovieComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    FormsModule, // Ajoutez cela à la liste des imports
    ToastrModule.forRoot(),
    




  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
