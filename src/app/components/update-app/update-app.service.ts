import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { UpdateAppComponent } from './update-app.component';

@Injectable({
  providedIn: 'root',
})
export class UpdateAppService {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);

  public openModal() {
    this.dialog
      .open<boolean>(UpdateAppComponent, {
        panelClass: 'modal-xs',
        backdropClass: 'backdrop-blur',
        hasBackdrop: false,
        maxWidth: 'min(calc(100vw - 1rem), 300px)',
        positionStrategy: this.overlay.position().global().left('0.5rem').bottom('0.5rem'),
      })
      .closed.subscribe((reload) => {
        if (reload) {
          window.location.reload();
        }
      });
  }
}
