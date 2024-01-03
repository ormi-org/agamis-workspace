import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { isDevMode } from "@angular/core";


async function prepare() {
  if (isDevMode()) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
  return Promise.resolve();
}

prepare().then(async () => {
  await bootstrapApplication(AppComponent, appConfig);
});