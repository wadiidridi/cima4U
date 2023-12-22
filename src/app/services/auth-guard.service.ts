// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ... Autres méthodes du service

  isLoggedIn(): boolean {
    // Logique pour vérifier si l'utilisateur est connecté
    // Par exemple, vous pouvez vérifier si un jeton d'authentification est présent.
    // Retournez true si l'utilisateur est connecté, sinon false.
    return true; // Modifiez ceci en fonction de votre logique réelle
  }
}
