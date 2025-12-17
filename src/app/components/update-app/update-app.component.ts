import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-update-app',
  imports: [MatButtonModule, MatIconModule, MatCardModule, TranslocoPipe],
  templateUrl: './update-app.component.html',
  styleUrl: './update-app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAppComponent {
  public readonly dialogRef = inject(DialogRef);
}
