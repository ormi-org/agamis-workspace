import { Component, Input } from '@angular/core';
import { Color } from '@agamis/workspace/shared/common/types';

@Component({
  standalone: true,
  selector: 'agamis-ws-svg-agamis-logo',
  templateUrl: '../../../assets/images/svg/agamis-logo.svg',
  styles: `
    :host {
        display: flex
    }
  `,
})
export class AgamisLogoSvgComponent {
  @Input()
  fillColor: string = Color.PRIMARY_ONE;
}
