import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvatarService } from '../../../core/services/avatar-service';
import { UserInfoService } from '../../../core/services/user-info-service';
import { SvgLogoEntrepriseComponent } from '../../svg/entreprise.svg.component';
import { SvgImageSearchComponent } from '../../svg/image-search.svg.component';
import { SvgLogoNotificationComponent } from '../../svg/notification.svg.component';
import { SvgLogoUserDefaultComponent } from '../../svg/user-default.svg.component';

import { AgamisLogoSvgComponent, AgamisTextSvgComponent } from '@agamis/workspace/shared/common/angular';
import { Color } from '@agamis/workspace/shared/common/types';
import Organization from '../../../core/services/models/organization';
import User from '../../../core/services/models/user';

@Component({
  standalone: true,
  selector: 'agamis-ws-nav-bar',
  imports: [
    CommonModule,
    SvgLogoUserDefaultComponent,
    SvgLogoEntrepriseComponent,
    SvgImageSearchComponent,
    SvgLogoNotificationComponent,
    AgamisLogoSvgComponent,
    AgamisTextSvgComponent,
    FormsModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  userInfo: User | null = null;
  orgInfo: Organization | null = null;
  Color = Color;
  newTabTitle = '';
  showNewTabInput = false;
  showUserMenu = false;
  avatarSrc: string | ArrayBuffer | null | undefined;
  searchText: string = '';

  /**
   * Construit une instance de NavBarComponent.
   * @param router Le service de routage Angular pour la navigation entre les vues.
   * @param tabService Le service de gestion des onglets pour la manipulation des onglets.
   */
  constructor(
    private router: Router,
    private avatarService: AvatarService,
    private userInfoService: UserInfoService
  ) {
    // Initialisation de l'Observable avec celui du service
    this.avatarService.currentAvatar.subscribe((avatar) => {
      this.avatarSrc = avatar;
    });
  }

  ngOnInit() {
    this.userInfoService.fetchUserData().subscribe({
      next: ({ user, org }) => {
        this.userInfo = user;
        console.log(user);
        this.orgInfo = org; // Stockez les informations de l'organisation
        console.log(org);
      },
      error: (err) => {
        console.error(
          'Erreur lors de la récupération des données utilisateur',
          err
        );
      },
    });
  }

  clearSearch() {
    this.searchText = '';
  }

  /**
   * Bascule la visibilité du menu utilisateur.
   */
  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }
}
