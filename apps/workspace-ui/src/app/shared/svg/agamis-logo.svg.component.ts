import { Component, Input } from '@angular/core';
import Color from '../../common/color';

@Component({
  standalone: true,
  selector: 'agamis-ws-svg-agamis-logo',
  templateUrl: '../../../assets/images/svg/agamis-logo.svg',
  styles: `
    
  `,
})
export class AgamisLogoSvgComponent {
  @Input()
  fillColor: string = Color.LIGHT;
}
