import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from '../../services/avatar-service';
import {UserInfoService } from '../../services/user-info-service';
import { CommonModule } from '@angular/common';
import {SvgLogoEntrepriseComponent } from "../../../shared/svg/entreprise.svg.component";
import {SvgLogoNotificationComponent} from "../../../shared/svg/notification.svg.component";
import {SvgLogoUserDefaultComponent } from "../../../shared/svg/user-default.svg.component";
import {SvgImageSearchComponent } from "../../../shared/svg/image-search.svg.component";
import { AgamisLogoSvgComponent } from "../../../shared/svg/agamis-logo.svg.component";
import { AgamisTextSvgComponent } from "../../../shared/svg/agamis-text.svg.component";

import Color from '../../../common/color';

@Component({
  standalone: true,
  selector: 'agamis-ws-nav-bar',
  imports: [CommonModule,SvgLogoUserDefaultComponent,SvgLogoEntrepriseComponent,SvgImageSearchComponent,SvgLogoNotificationComponent,AgamisLogoSvgComponent, AgamisTextSvgComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userInfo: any;
  Color = Color;
  newTabTitle = '';
  showNewTabInput = false;
  showUserMenu = false;
  // Propriété Observable pour suivre l'onglet actif
  avatarSrc: string | ArrayBuffer | null | undefined;

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
    
    this.userInfoService.userInfos$.subscribe(data => {
      this.userInfo = data;
      
    })
  }
 


  /**
   * Bascule la visibilité du menu utilisateur.
   */
  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }

}


 