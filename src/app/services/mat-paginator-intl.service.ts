import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@jsverse/transloco';
import { marker as _ } from '@jsverse/transloco-keys-manager/marker';

const I18N_MAT_PAGINATOR = {
  OF: _('mat-paginator.of'),
  FIRST_PAGE: _('mat-paginator.first-page'),
  ITEMS_PER_PAGE: _('mat-paginator.items-per-page'),
  LAST_PAGE: _('mat-paginator.last-page'),
  NEXT_PAGE: _('mat-paginator.next-page'),
  PREVIOUS_PAGE: _('mat-paginator.previous-page'),
};

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
    const of = this.transloco ? this.transloco.translate(I18N_MAT_PAGINATOR.OF) : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  public translateLabels(): void {
    this.firstPageLabel = this.transloco.translate(I18N_MAT_PAGINATOR.FIRST_PAGE);
    this.itemsPerPageLabel = this.transloco.translate(I18N_MAT_PAGINATOR.ITEMS_PER_PAGE);
    this.lastPageLabel = this.transloco.translate(I18N_MAT_PAGINATOR.LAST_PAGE);
    this.nextPageLabel = this.transloco.translate(I18N_MAT_PAGINATOR.NEXT_PAGE);
    this.previousPageLabel = this.transloco.translate(I18N_MAT_PAGINATOR.PREVIOUS_PAGE);
    this.changes.next(); // Fire a change event to make sure that the labels are refreshed
  }
}
