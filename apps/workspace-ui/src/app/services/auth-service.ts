import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  login() {
     // Implémentez la logique de connexion ici
     throw new Error("> AuthService#login() < Method not implemented");

  }

  logout() {
    this.isAuthenticated = false;
  }
}
