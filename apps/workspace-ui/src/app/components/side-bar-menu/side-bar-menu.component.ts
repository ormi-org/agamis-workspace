import { Component } from '@angular/core';
import { SideBarService } from '../../services/sideBar-service'

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.sass'],
})
export class SideBarMenuComponent {
// Variables to control the visibility of the div elements
projectsVisible = false;
collabVisible = false;

constructor(private sideBarService: SideBarService) {}

// Function to toggle the visibility of the projects div
toggleProjects() {
  this.projectsVisible = !this.projectsVisible;
  this.collabVisible = false; // Hide collab div when showing projects div
}

// Function to toggle the visibility of the collab div
toggleCollab() {
  this.collabVisible = !this.collabVisible;
  this.projectsVisible = false; // Hide projects div when showing collab div
}

closeSideMenu() {
  this.sideBarService.closeSideMenu();
  }
}

