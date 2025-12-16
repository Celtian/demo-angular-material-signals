import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { marker as _ } from '@jsverse/transloco-keys-manager/marker';
import { first, map, Observable } from 'rxjs';
import { ConfirmDialogService } from '../components/confirm-dialog/confirm-dialog.service';

const TITLE = {
  DELETE: _('custom-confirm-dialog.delete-post.title'),
  UNSAVED_WORK: _('custom-confirm-dialog.unsaved-work.title'),
  DEFAULT: _('custom-confirm-dialog.default.title'),
};

const CONTENT = {
  DELETE: _('custom-confirm-dialog.delete-post.content'),
  UNSAVED_WORK: _('custom-confirm-dialog.unsaved-work.content'),
  DEFAULT: _('custom-confirm-dialog.default.content'),
};

export type CustomConfirmDialog = keyof typeof TITLE;

@Injectable({ providedIn: 'root' })
export class CustomConfirmDialogService {
  private readonly confirm = inject(ConfirmDialogService);
  private readonly transloco = inject(TranslocoService);

  public open(type: CustomConfirmDialog): Observable<boolean> {
    const title = TITLE[type];
    const content = CONTENT[type];

    return this.confirm.open(this.transloco.translate(title), this.transloco.translate(content)).pipe(
      first(),
      map((res) => !!res),
    );
  }
}
