import { Component, Input } from "@angular/core";
import { Color } from "../../common/color";

@Component({
  standalone: true,
  selector: 'agamis-ws-login-svg-loading-spin',
  templateUrl: "../../../assets/images/svg/loading-spin.svg",
  styles: `
    :host {
        display: flex
    }
  `
})
export class LoadingSpinSvgComponent {
    @Input()
    fillColor: string = Color.PRIMARY_ONE;
}