import { Color } from '@agamis/workspace/shared/common/types';
import { Component, Input } from "@angular/core";

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