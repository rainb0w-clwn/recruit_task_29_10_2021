import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Location} from '@angular/common';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

Location.stripTrailingSlash = (url: string) => url;

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
