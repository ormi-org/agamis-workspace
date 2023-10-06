import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { SearchService } from './../../services/SearchService';
// import { AuthService } from './../../services/AuthService';
// import { CompanyService } from './../../services/CompanyService';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    // private searchService: SearchService,
    // private authService: AuthService,
    // private companyService: CompanyService,
    private router: Router
  ) { }

  // onSearch(query: string): void {
  //   this.searchService.search(query).subscribe(results => {
  //     // Traitez les résultats ici, par exemple en naviguant vers une page de résultats
  //     this.router.navigate(['/search-results'], { queryParams: { query: query } });
  //   });
  // }

  // login(): void {
  //   this.authService.login();
  // }

  // logout(): void {
  //   this.authService.logout();
  // }

  // get isAuthenticated(): boolean {
  //   return this.authService.isAuthenticated;
  // }

  // fetchCompanyDetails(): void {
  //   this.companyService.getCompanyDetails().subscribe(details => {
  //     // Traitez les détails de l'entreprise ici
  //   });
  // }
}
