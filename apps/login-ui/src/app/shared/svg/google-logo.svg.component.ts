import { Component, Input } from "@angular/core";
import { Color } from "../../common/color";

@Component({
    standalone: true,
    selector: 'agamis-ws-login-svg-google-logo',
    templateUrl: "../../../assets/images/svg/google-logo.svg",
    styles: `
        :host {
            display: flex
        }
    `,
})
export class GoogleLogoSvgComponent {
    @Input()
    fillColor: string = Color.PRIMARY_ONE;
}