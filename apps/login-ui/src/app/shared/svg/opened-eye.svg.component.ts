import { Color } from '@agamis/workspace/shared/common/types';
import { Component, Input } from '@angular/core';

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
