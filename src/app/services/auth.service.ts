// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = '7266d7a9bc26929fc9383d6010730245';
  private tokenUrl = 'https://api.themoviedb.org/3/authentication/token/new';
  private validateUrl = 'https://api.themoviedb.org/3/authentication/token/validate_with_login';
  private sessionUrl = 'https://api.themoviedb.org/3/authentication/session/new';
  private accountId: string = '';
  private loggedIn = false;

  // Ajoutez ces propriétés pour définir la configuration de l'environnement
  private env = {
    baseUrl: 'https://api.themoviedb.org/3', // Assurez-vous de mettre la base URL correcte
    api_key: '7266d7a9bc26929fc9383d6010730245' // Remplacez par votre clé d'API
  };

  constructor(private http: HttpClient) {}

  getRequestToken(): Observable<any> {
    const url = `${this.env.baseUrl}/authentication/token/new?api_key=${this.env.api_key}`;
    return this.http.get(url);
  }

  validateWithLogin(requestToken: string,username:string,password:string): Observable<any> {
    const url = `${this.env.baseUrl}/authentication/token/validate_with_login?api_key=${this.env.api_key}`;
    const body = {
      username : username,
      password:password,
      request_token: requestToken,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, body, { headers });
  }

  getAccountDetails(sessionId: string): Observable<any> {
    const url = `${this.env.baseUrl}/account`;
    const params = {
      api_key: this.env.api_key,
      session_id: sessionId,
    };
 
    return this.http.get(url, { params });
  }  

  createSession(requestToken: string): Observable<any> {
    const url = `${this.sessionUrl}?api_key=${this.env.api_key}`;
    const body = { request_token: requestToken };
    return this.http.post(url, body);
  }

  getAccountId(): string {
    return this.accountId;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
}
