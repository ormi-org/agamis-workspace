import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabManagementService } from '../../services/tab-management-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent {

  constructor(
    private router: Router,
    private tabService: TabManagementService
  ) { }


  
  selectTab(tabNumber: number): void {
    this.tabService.setActiveTab(tabNumber);
  }

  get activeTab(): number {
    return this.tabService.getActiveTab();
  }
  

}
