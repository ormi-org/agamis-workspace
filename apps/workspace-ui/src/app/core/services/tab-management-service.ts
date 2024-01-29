import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';



export interface Tab {
  id: string; // L'ID de l'onglet est maintenant un UUID de type string
  title: string;
  component: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabManagementService {
  private activeTabSubject = new BehaviorSubject<string | null>(null);
  public activeTabId$ = this.activeTabSubject.asObservable();
  private tabs = new Map<string, Tab>();

  /**
   * Définit l'onglet actif par son ID.
   * @param tabId L'ID de l'onglet à activer. Si null, aucun onglet n'est actif.
   */
  setActiveTab(tabId: string | null): void {
    this.activeTabSubject.next(tabId);
  }

  /**
   * Obtient l'ID de l'onglet actif.
   * @return L'ID de l'onglet actuellement actif, ou null si aucun onglet n'est actif.
   */
  getActiveTab(): string | null {
    return this.activeTabSubject.value;
  }

  /**
   * Ajoute un nouvel onglet avec un titre et un nom de composant associé.
   * @param title Le titre du nouvel onglet.
   * @param componentName Le nom du composant Angular à associer avec le nouvel onglet.
   */
  addTabWithComponent(title: string, componentName: string): void {
    const newTab: Tab = { id: uuidv4(), title, component: componentName };
    this.tabs.set(newTab.id, newTab);
    this.setActiveTab(newTab.id);
  }

  /**
   * Supprime un onglet par son ID et ajuste l'onglet actif si nécessaire.
   * @param tabId L'ID de l'onglet à supprimer.
   */
  removeTab(tabId: string): void {
    this.tabs.delete(tabId);
    if (this.getActiveTab() === tabId) {
      const tabsArray = Array.from(this.tabs.values());
      const newIndex = tabsArray.findIndex(tab => tab.id === tabId) - 1;
      this.setActiveTab(tabsArray[newIndex] ? tabsArray[newIndex].id : null);
    }
  }

  /**
   * Obtient la liste de tous les onglets ouverts.
   * @return Un tableau contenant tous les onglets actuellement ouverts.
   */
  getTabs(): Tab[] {
    return Array.from(this.tabs.values());
  }
}