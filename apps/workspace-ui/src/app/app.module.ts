import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';

import { SidebarComponent } from './components/sidebar-tab/sidebar-tab.component';
// import { Authservice } from './services/auth-service';
// import { OrganisationService } from './services/organisation-service';
// import { SearchService } from './services/search-service';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NavBarComponent,
    ProfileTabComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
