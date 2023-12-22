import { Component, Input } from "@angular/core";
import { Color } from "../../common/color";

@Component({
  standalone: true,
  selector: 'agamis-ws-login-svg-agamis-logo',
  templateUrl: "../../../assets/images/svg/agamis-logo.svg",
  styles: `
    :host {
        display: flex
    }
  `
})
export class AgamisLogoSvgComponent {
    @Input()
    fillColor: string = Color.PRIMARY_ONE;
}