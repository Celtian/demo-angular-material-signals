import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialog } from './confirm-dialog';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  public open(title: string, content: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: 'sm',
      data: { title, content },
    });
    return dialogRef.afterClosed();
  }
}
