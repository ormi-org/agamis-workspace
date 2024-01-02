import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { SidebarComponent } from './components/sidebar-tab/sidebar-tab.component';
import { SvgLogoAgamisComponent } from './components/svg/svg-logo-agamis/svg-logo-agamis.component';
import { SvgLogoNotificationComponent } from './components/svg/svg-logo-notification/svg-logo-notification.component';
import { SvgImageSearchComponent } from './components/svg/svg-image-search/svg-image-search.component';
import { SvgLogoEntrepriseComponent } from './components/svg/svg-logo-entreprise/svg-logo-entreprise.component';
import { SvgLogoUserDefaultComponent } from './components/svg/svg-logo-user-default/svg-logo-user-default.component';
import { SvgIconeAccountComponent } from './components/svg/svg-icone-account/svg-icone-account.component';
import { SvgIconeNotificationOutlineComponent } from './components/svg/svg-icone-notification-outline/svg-icone-notification-outline.component';
import { SvgIconeSessionsComponent } from './components/svg/svg-icone-sessions/svg-icone-sessions.component';

// import { Authservice } from './services/auth-service';
// import { OrganisationService } from './services/organisation-service';
// import { SearchService } from './services/search-service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileTabComponent,
    SidebarComponent,
    SvgLogoAgamisComponent,
    SvgLogoNotificationComponent,
    SvgImageSearchComponent,
    SvgLogoEntrepriseComponent,
    SvgLogoUserDefaultComponent,
    SvgIconeAccountComponent,
    SvgIconeNotificationOutlineComponent,
    SvgIconeSessionsComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
