import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);
  private readonly baseHref = inject(APP_BASE_HREF, { optional: true }) ?? '';

  public getTranslation(lang: string) {
    return this.http.get<Translation>(`${this.baseHref}i18n/${lang}.json`);
  }
}
