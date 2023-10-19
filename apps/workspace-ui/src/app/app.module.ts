import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NavBarComponent } from './components/navBar/nav-bar.component';
// import { Authservice } from './services/auth-service';
// import { OrganisationService } from './services/organisation-service';
// import { SearchService } from './services/search-service';


@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NavBarComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
 }
}
