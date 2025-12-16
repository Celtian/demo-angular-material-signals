import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@jsverse/transloco';

@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {
  public readonly transloco = inject(TranslocoService);

  constructor() {
    super();
    this.transloco.langChanges$.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = this.transloco ? this.transloco.translate('mat-paginator.of') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  public translateLabels(): void {
    this.firstPageLabel = this.transloco.translate('mat-paginator.first-page');
    this.itemsPerPageLabel = this.transloco.translate('mat-paginator.items-per-page');
    this.lastPageLabel = this.transloco.translate('mat-paginator.last-page');
    this.nextPageLabel = this.transloco.translate('mat-paginator.next-page');
    this.previousPageLabel = this.transloco.translate('mat-paginator.previous-page');
    this.changes.next(); // Fire a change event to make sure that the labels are refreshed
  }
}
