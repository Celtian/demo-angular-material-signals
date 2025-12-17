import { ApplicationConfig, ErrorHandler, inject, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { MAT_CARD_CONFIG, MatCardConfig } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@jsverse/transloco';
import { provideAppVersion } from 'ngx-app-version';
import { provideFixedFooter } from 'ngx-fixed-footer';
import { provideUpdateApp } from 'ngx-update-app';
import { VERSION } from '../version';
import { routes } from './app.routes';
import { UpdateAppService } from './components/update-app/update-app.service';
import { CustomErrorHandlerService } from './services/custom-error-handler.service';
import { MatPaginationIntlService } from './services/mat-paginator-intl.service';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(),
    provideFixedFooter({
      containerSelector: '.permanent-main',
      cssAttribute: 'margin',
    }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'cs'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppVersion({ version: VERSION.version }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideUpdateApp({
      interval: 1000 * 60,
      dryRun: false,
      onUpdateFactory: () => {
        const dialog = inject(UpdateAppService);
        return () => dialog.openModal();
      },
    }),
    { provide: ErrorHandler, useClass: CustomErrorHandlerService },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginationIntlService,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' } as MatFormFieldDefaultOptions,
    },
    {
      provide: MAT_CARD_CONFIG,
      useValue: { appearance: 'outlined' } as MatCardConfig,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { horizontalPosition: 'end', verticalPosition: 'top', duration: 2000 } as MatSnackBarConfig,
    },
  ],
};
