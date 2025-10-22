import { Component, Input } from "@angular/core";
import { Color } from '@agamis/workspace/shared/common/types';

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