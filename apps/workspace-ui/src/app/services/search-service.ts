import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
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
  search(query: string): Observable<string> { // On remplacera any par le type de reponse qui sera renvoyer par l'API
    const params = new HttpParams().set('query', query);
    return this.http.get<string>('/api/search', { params });
  }
}
