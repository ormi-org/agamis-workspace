import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TabManagementService, Tab } from '../../services/tab-management-service';
import { Observable } from 'rxjs';
import {

  FormsModule,

} from '@angular/forms';

@Component({
  selector: 'agamis-ws-tab-list',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './tab-list.component.html',
  styleUrl: './tab-list.component.scss',
})
export class TabListComponent {
  activeTab$: Observable<string | null>;
  newTabTitle: string ='';
  showNewTabInput = false;
  showUserMenu = false;
  constructor(
    private router: Router,
    private tabService: TabManagementService,
  ) {
    // Initialisation de l'Observable avec celui du service
    this.activeTab$ = this.tabService.activeTabId$;
  }
  /**
   * Active un onglet spécifié par son ID.
   * @param tabId L'ID de l'onglet à activer. Peut être null pour indiquer aucun onglet actif.
   */
  selectTab(tabNumber: string): void {
    this.tabService.setActiveTab(tabNumber);
  }
  addTab(): void {
    if (this.newTabTitle.trim()) {
      this.tabService.addTabWithComponent(this.newTabTitle, '');
      this.newTabTitle = '';
    }
  }
  

  /**
   * Supprime un onglet spécifié par son ID.
   * @param tabId L'ID de l'onglet à supprimer.
   */
  removeTab(tabId: string): void {
    this.tabService.removeTab(tabId);
  }



  /**
   * Retourne un tableau contenant tous les onglets actuellement ouverts.
   * @return Un tableau des instances d'onglet.
   */
  get tabs(): Tab[] {
    return this.tabService.getTabs();
  }

  /**
   * Vérifie si la liste des onglets est vide.
   * @return Un booléen indiquant si la liste des onglets est vide.
   */
  isTabListEmpty(): boolean {
    return this.tabs.length === 0;
  }


  /**
   * Ouvre un onglet et crée le composant associé à cet onglet.
   * @param title Le titre de l'onglet.
   * @param componentName Le nom du composant associé à cet onglet.
   * @param route La route à naviguer lorsque cet onglet est ouvert.
   */
  openAndCreateTab(title: string, componentName: string, route: string): void {
    this.tabService.addTabWithComponent(title, componentName);
    this.router.navigate([route]);
  }

  /**
   * Ouvre l'onglet de profil et crée le `ProfileTabComponent`.
   */
  openProfile(): void {
    this.openAndCreateTab('Profile', 'ProfileTabComponent', '/profile');
  }

  // openAccountSettings(): void {
  //   this.openAndCreateTab('Account Settings', '/account-settings');
  // }

  // openSessions(): void {
  //   this.openAndCreateTab('Sessions', '/sessions');
  // }
}
