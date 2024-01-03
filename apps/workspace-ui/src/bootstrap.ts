import { isDevMode } from '@angular/core';


export async function prepare() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}


