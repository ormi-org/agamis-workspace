import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyDetails() {
    // Besoin d'adapter l'URL selon le backend/API
    return this.http.get('/api/company-details');
  }
}
