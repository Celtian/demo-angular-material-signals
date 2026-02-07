import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { debounceTime, filter, finalize, Observable, switchMap, tap } from 'rxjs';
import { ClearSuffix } from '../../../components/clear-suffix/clear-suffix';
import { TextProgress } from '../../../components/text-progress/text-progress';
import { API_URL } from '../../../constant/api.constant';
import { PostDto } from '../../../dto/post.dto';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { ApiService } from '../../../services/api.service';
import { CustomConfirmDialogService } from '../../../services/custom-confirm-dialog.service';
import { NotificationService } from '../../../services/notification.service';

const DEFAULT_POST: Pick<PostDto, 'title' | 'body'> = { title: '', body: '' };

@Component({
  selector: 'app-post-edit',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormField,
    TranslocoPipe,
    ClearSuffix,
    TextProgress,
  ],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostEdit implements CanComponentDeactivate {
  private readonly notification = inject(NotificationService);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly confirm = inject(CustomConfirmDialogService);

  public readonly id = input.required<number>();
  public readonly model = signal(DEFAULT_POST);
  public readonly form = form(this.model, (f) => [
    required(f.title),
    required(f.body),
    disabled(f, () => this.isProcessing()),
  ]);
  public readonly resource = httpResource<PostDto>(() => `${API_URL}/posts/${this.id()}`);

  public readonly isDeleting = signal(false);
  public readonly isSaving = signal(false);

  public readonly isProcessing = computed(() => this.resource.isLoading() || this.isDeleting() || this.isSaving());

  constructor() {
    effect(() => this.model.set(this.resource.value() ?? DEFAULT_POST));
  }

  public canDeactivate(): Observable<boolean> | boolean {
    return !this.form().dirty() || this.confirm.open('UNSAVED_WORK');
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.isSaving.set(true);
    this.apiService
      .patch(this.id(), this.form().value())
      .pipe(
        debounceTime(1000),
        finalize(() => this.isSaving.set(false)),
      )
      .subscribe((post) => {
        this.form().reset(post);
        this.notification.success('UPDATE');
      });
  }

  public onReset(event: Event): void {
    event.preventDefault();
    this.form().reset(this.resource.value() ?? DEFAULT_POST);
  }

  public onDelete() {
    this.confirm
      .open('DELETE')
      .pipe(
        filter((confirmed) => !!confirmed),
        tap(() => this.isDeleting.set(true)),
        debounceTime(1000),
        switchMap(() => this.apiService.delete(this.id())),
        finalize(() => this.isDeleting.set(false)),
      )
      .subscribe(() => {
        this.notification.success('DELETE');
        this.router.navigate(['/']);
      });
  }
}
