import { Component, Input } from '@angular/core';
import Color from '../../common/color';

@Component({
  standalone: true,
  selector: 'agamis-ws-svg-agamis-text',
  templateUrl: '../../../assets/images/svg/agamis-text.svg',
  styles: `:host{
   padding: 5px;
  }
  `,
})
export class AgamisTextSvgComponent {
  @Input()
  fillColor: string = Color.LIGHT;
}
