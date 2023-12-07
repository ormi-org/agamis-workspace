import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Organisation {
  id: number;
  name: string;
  // On ajoutera le reste du model Ogranisation ici
}

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  constructor(private http: HttpClient) { }

  /**
   * Récupère les détails de l'organisation.
   * @return Un Observable contenant les détails de l'organisation.
   */
  getOrganisationDetails(): Observable<Organisation> {
    // Besoin d'adapter l'URL selon le backend/API
    return this.http.get<Organisation>('/api/organisation-details');
  }
}
