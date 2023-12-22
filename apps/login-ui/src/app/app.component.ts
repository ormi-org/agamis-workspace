import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'agamis-ws-login-root',
    template: `<router-outlet></router-outlet>`,
    styles: `
        :host {
            height: 100%;
        }
    `,
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Login';
}
