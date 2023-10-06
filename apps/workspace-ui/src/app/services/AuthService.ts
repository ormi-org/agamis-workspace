import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  login() {
    // Implémentez la logique de connexion ici
  }

  logout() {
    this.isAuthenticated = false;
  }
}
