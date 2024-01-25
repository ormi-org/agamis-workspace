import { Component } from '@angular/core';

@Component({
  selector: 'workspace-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
// Variables to control the visibility of the div elements
projectsVisible = false;
collabVisible = false;

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
}





