import { Route } from '@angular/router';
import { LoginPageComponent } from './core/pages/login-page/LoginPage.component';

export const APP_ROUTES: Route[] = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
