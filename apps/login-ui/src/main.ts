import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { isDevMode } from '@angular/core';

async function prepare() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    worker.start({
      onUnhandledRequest: "bypass"
    });
  }
  return Promise.resolve();
}

prepare().then(async () => {
  const app = await createApplication(appConfig);

  const appElement = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('agamis-ws-login-root', appElement);
});