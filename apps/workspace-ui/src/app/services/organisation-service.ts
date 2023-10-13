import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) { }

  getOrganisationDetails() {
    // Besoin d'adapter l'URL selon le backend/API
    return this.http.get('/api/organisation-details');
  }
}
