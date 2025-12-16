import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import { marker as _ } from '@jsverse/transloco-keys-manager/marker';

const SUCCESS_NOTIFACATIONS = {
  CREATE: _('response.create.success'),
  UPDATE: _('response.update.success'),
  DELETE: _('response.delete.success'),
};

const ERROR_NOTIFACATIONS = {
  UNEXPECTED: _('error.unexpected-exception'),
};

export type SuccessNotification = keyof typeof SUCCESS_NOTIFACATIONS;
export type ErrorNotification = keyof typeof ERROR_NOTIFACATIONS;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly transloco = inject(TranslocoService);

  public success(notification: SuccessNotification) {
    this.snackBar.open(
      this.transloco.translate(SUCCESS_NOTIFACATIONS[notification]),
      this.transloco.translate(_('action.close')),
    );
  }

  public error(notification: ErrorNotification) {
    this.snackBar.open(
      this.transloco.translate(ERROR_NOTIFACATIONS[notification]),
      this.transloco.translate(_('action.close')),
    );
  }
}
