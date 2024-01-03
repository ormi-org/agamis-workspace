import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { SidebarComponent } from './components/sidebar-tab/sidebar-tab.component';
import { SvgLogoAgamisComponent } from './shared/svg/svg-logo-agamis.component';
import { SvgLogoNotificationComponent } from './shared/svg/svg-logo-notification.component';
import { SvgImageSearchComponent } from './shared/svg/svg-image-search.component';
import { SvgLogoEntrepriseComponent } from './shared/svg/svg-logo-entreprise.component';
import { SvgLogoUserDefaultComponent } from './shared/svg/svg-logo-user-default.component';
import { SvgIconeAccountComponent } from './shared/svg/svg-icone-account.component';
import { SvgIconeNotificationOutlineComponent } from './shared/svg/svg-icone-notification-outline.component';
import { SvgIconeSessionsComponent } from './shared/svg/svg-icone-sessions.component';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
