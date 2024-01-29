import { Route } from '@angular/router';
import { LoginPageComponent } from './core/pages/login-page/login-page.component';
import { SplashScreenComponent } from './core/pages/splash-screen/splash-screen.component';
import { NotFoundComponent } from './core/pages/error/not-found/not-found.component';
import { TabListComponent } from './core/pages/tab-list/tab-list.component';

export const APP_ROUTES: Route[] = [
  {
    path: "",
    component: SplashScreenComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    pathMatch: 'full'
  },
  {
    path: 'tab-list',
    component: TabListComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: '/not-found',
  //   pathMatch: 'full'
  // }
];
