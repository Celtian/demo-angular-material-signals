import { ErrorHandler, Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {
  private readonly notification = inject(NotificationService);

  public handleError(error: unknown): void {
    this.notification.error('UNEXPECTED');
    throw error;
  }
}
