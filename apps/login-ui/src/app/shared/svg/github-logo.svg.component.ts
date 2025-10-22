import { Component, Input } from "@angular/core";
import { Color } from '@agamis/workspace/shared/common/types';

@Component({
    standalone: true,
    selector: 'agamis-ws-login-svg-github-logo',
    templateUrl: "../../../assets/images/svg/github-logo.svg",
    styles: `
        :host {
            display: flex
        }
    `,
})
export class GithubLogoSvgComponent {
    @Input()
    fillColor: string = Color.PRIMARY_ONE;
}