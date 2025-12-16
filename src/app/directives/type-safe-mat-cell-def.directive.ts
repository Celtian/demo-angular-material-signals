import { CdkCellDef } from '@angular/cdk/table';
import { Directive, input } from '@angular/core';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDef }],
})
export class TypeSafeMatCellDef<T> extends MatCellDef {
  readonly matCellDefDataSource = input.required<T[] | Observable<T[]> | MatTableDataSource<T>>();

  static ngTemplateContextGuard<T>(dir: TypeSafeMatCellDef<T>, ctx: unknown): ctx is { $implicit: T; index: number } {
    return true;
  }
}
