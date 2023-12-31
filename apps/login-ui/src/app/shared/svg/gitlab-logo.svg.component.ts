import { Component, Input } from "@angular/core";
import Color from "../../common/color";

@Component({
    standalone: true,
    selector: 'agamis-ws-login-svg-gitlab-logo',
    templateUrl: "../../../assets/images/svg/gitlab-logo.svg",
    styles: `
        :host {
            display: flex
        }
    `,
})
export class GitlabLogoSvgComponent {
    @Input()
    fillColor: string = Color.PRIMARY_ONE;
}