import { ErrorHandler, Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {
  public readonly transloco = inject(TranslocoService);
  private snackbar = inject(MatSnackBar);

  public handleError(error: unknown): void {
    this.snackbar.open(this.transloco.translate('error.unexpected-exception'), 'danger');
    throw error;
  }
}
