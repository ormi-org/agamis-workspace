import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { SearchService } from '../../services/search-service';
import { OrganisationService } from '../../services/organisation-service';
import { TabManagementService } from '../../services/tab-management-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    // private searchService: SearchService,
    // private authService: AuthService,
    // private organisationService: OrganisationService,
    private router: Router,
    // private tabService: TabManagementService
  ) { }


  
  // selectTab(tabNumber: number): void {
  //   this.tabService.setActiveTab(tabNumber);
  // }

  // get activeTab(): number {
  //   return this.tabService.getActiveTab();
  // }
  
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

  // fetchOrganisationDetails(): void {
  //   this.organisationService.getOrganisationDetails().subscribe(details => {
  //     // Traitez les détails de l'entreprise ici
  //   });
  // }
}
