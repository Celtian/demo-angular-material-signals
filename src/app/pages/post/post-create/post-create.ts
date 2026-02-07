import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { debounceTime, finalize, Observable } from 'rxjs';
import { ClearSuffix } from '../../../components/clear-suffix/clear-suffix';
import { TextProgress } from '../../../components/text-progress/text-progress';
import { PostInputDto } from '../../../dto/post.dto';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { ApiService } from '../../../services/api.service';
import { CustomConfirmDialogService } from '../../../services/custom-confirm-dialog.service';
import { NotificationService } from '../../../services/notification.service';

const DEFAULT_POST: PostInputDto = { title: '', body: '', userId: 1 };

@Component({
  selector: 'app-post-create',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormField,
    TranslocoPipe,
    ClearSuffix,
    TextProgress,
  ],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostCreate implements CanComponentDeactivate {
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly apiService = inject(ApiService);
  private readonly confirm = inject(CustomConfirmDialogService);

  public readonly model = signal(DEFAULT_POST);
  public readonly form = form(this.model, (f) => [
    required(f.title),
    required(f.body),
    disabled(f, () => this.isSaving()),
  ]);

  public readonly isSaving = signal(false);

  public canDeactivate(): Observable<boolean> | boolean {
    return !this.form().dirty() || this.confirm.open('UNSAVED_WORK');
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.isSaving.set(true);
    this.apiService
      .create(this.form().value())
      .pipe(
        debounceTime(1000),
        finalize(() => this.isSaving.set(false)),
      )
      .subscribe((post) => {
        this.form().reset(post);
        this.notification.success('CREATE');
        this.router.navigate(['/']);
      });
  }

  public onReset(event: Event): void {
    event.preventDefault();
    this.form().reset(DEFAULT_POST);
  }
}
