import { Route } from '@angular/router';
import { LoginPageComponent } from './core/pages/login-page/login-page.component';
import { SplashScreenComponent } from './core/pages/splash-screen/splash-screen.component';
import { NotFoundComponent } from './core/pages/error/not-found/not-found.component';
import { ProfileTabComponent } from './core/pages/profile-tab/profile-tab.component';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: SplashScreenComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'profile',
    component: ProfileTabComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: '/not-found',
  //   pathMatch: 'full',
  // },
];
