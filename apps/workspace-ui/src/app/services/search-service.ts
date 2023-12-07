import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  /**
   * Effectue une recherche basée sur la requête fournie et renvoie les résultats.
   * @param query La requête de recherche.
   * @return Un Observable des résultats de la recherche.
   */
  search(query: string): Observable<any> { // On remplacera any par le type de reponse qui sera renvoyer par l'API
    // Adaptez l'URL selon votre backend/API
    return this.http.get<any>(`/api/search?query=${encodeURIComponent(query)}`);
  }
}
