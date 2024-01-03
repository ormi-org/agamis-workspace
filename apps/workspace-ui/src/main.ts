import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { prepare } from './bootstrap';

prepare().then(() => {
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});