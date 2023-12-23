import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { isDevMode } from '@angular/core';

async function prepare() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }
  return Promise.resolve();
}

prepare().then(() => {
  bootstrapApplication(AppComponent, appConfig);
});

// (async () => {
//   const app = await createApplication(appConfig);

//   const appElement = createCustomElement(AppComponent, {
//     injector: app.injector,
//   });

//   customElements.define('agamis-ws-login-root', appElement);
// })();
