/*!

=========================================================
* Budget Meter - v0.1.0
=========================================================

* Product Page:  https://github.com/thecodacus/budget-meter
* Copyright 2022 The Codacus (https://www.codacus.com)
* Licensed under MIT (https://github.com/thecodacus/budget-meter/blob/master/LICENSE.md)

* Coded by The Codacus

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
