import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);

// (async () => {
//   const app = await createApplication(appConfig);

//   const appElement = createCustomElement(AppComponent, {
//     injector: app.injector,
//   });

//   customElements.define('agamis-ws-login-root', appElement);
// })();
