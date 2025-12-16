import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-clear-suffix',
  imports: [MatTooltipModule, MatButtonModule, MatIconModule, TranslocoPipe],
  templateUrl: './clear-suffix.html',
  styleUrl: './clear-suffix.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mr-2' },
})
export class ClearSuffix {
  public readonly transloco = inject(TranslocoService);
  private readonly formField = inject(MatFormField);

  public clear(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.formField._control.ngControl as any).field().value.set('');
  }
}
