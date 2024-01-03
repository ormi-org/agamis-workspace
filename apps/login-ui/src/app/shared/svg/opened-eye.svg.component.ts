import { Component, Input } from '@angular/core';
import Color from '../../common/color';

@Component({
  standalone: true,
  selector: 'agamis-ws-login-svg-opened-eye',
  templateUrl: '../../../assets/images/svg/opened-eye.svg',
  styles: `
    :host {
        display: flex
    }
  `,
})
export class OpenedEyeSvgComponent {
  @Input()
  fillColor: string = Color.PRIMARY_ONE;
}
