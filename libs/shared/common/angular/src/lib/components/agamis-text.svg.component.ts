import { Color } from '@agamis/workspace/shared/common/types';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'agamis-ws-lib-svg-agamis-text',
  templateUrl: '../assets/images/svg/agamis-text.svg',
  styles: `
    :host {
        display: flex
    }
  `,
})
export class AgamisTextSvgComponent {
  @Input()
  fillColor: string = Color.LIGHT;
}
