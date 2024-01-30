import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from '../../services/avatar-service';
import { UserInfoService } from '../../services/user-info-service';
import { CommonModule } from '@angular/common';
import { SvgLogoEntrepriseComponent } from "../../../shared/svg/entreprise.svg.component";
import { SvgLogoNotificationComponent} from "../../../shared/svg/notification.svg.component";
import { SvgLogoUserDefaultComponent } from "../../../shared/svg/user-default.svg.component";
import { SvgImageSearchComponent } from "../../../shared/svg/image-search.svg.component";
import { AgamisLogoSvgComponent } from "../../../../../../../libs/shared/common/svg-components/type/agamis-logo.svg.component";
import { AgamisTextSvgComponent } from "../../../../../../../libs/shared/common/svg-components/type/agamis-text.svg.component";
import { FormsModule } from '@angular/forms';


import Color from '../../../common/color';
import Organization from '../../services/models/organization';
import User from '../../services/models/user';

@Component({
  standalone: true,
  selector: 'agamis-ws-nav-bar',
  imports: [CommonModule,SvgLogoUserDefaultComponent,SvgLogoEntrepriseComponent,SvgImageSearchComponent,SvgLogoNotificationComponent,AgamisLogoSvgComponent, AgamisTextSvgComponent,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userInfo: User | null=null;
  orgInfo: Organization | null=null;
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
    private userInfoService: UserInfoService,
  ) {
    // Initialisation de l'Observable avec celui du service
    this.avatarService.currentAvatar.subscribe(avatar => {
    this.avatarSrc = avatar; 
  });}
  
  ngOnInit() {
    
    this.userInfoService.fetchUserData().subscribe({
      next: ({ user, org }) => {
        this.userInfo = user;
        console.log(user);
        this.orgInfo = org; // Stockez les informations de l'organisation
        console.log(org);
      },
      error: err => {
        console.error('Erreur lors de la récupération des données utilisateur', err);
      }
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


 