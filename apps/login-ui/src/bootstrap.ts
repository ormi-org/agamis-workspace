import { isDevMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

async function prepare() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass',
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
