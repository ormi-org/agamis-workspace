import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';

export const routes: Routes = [

  { path: 'profile', component: ProfileTabComponent },
  // ... autres routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }