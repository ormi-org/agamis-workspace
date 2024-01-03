import { Component, Input } from '@angular/core';
import Color from '../../common/color';

@Component({
  standalone: true,
  selector: 'agamis-ws-svg-agamis-text',
  templateUrl: '../../../assets/images/svg/agamis-text.svg',
  styles: `
    :host {
        display: flex
    }
  `,
})
export class AgamisTextSvgComponent {
  @Input()
  fillColor: string = Color.PRIMARY_ONE;
}
