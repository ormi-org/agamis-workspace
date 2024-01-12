import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { AccountSettingTabComponent } from './components/account-setting-tab/account-setting-tab.component';

export const routes: Routes = [

  { path: 'profile', component: ProfileTabComponent },
  { path: 'account-settings', component: AccountSettingTabComponent },
  // ... autres routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }