import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoPipe } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { PostInputDto } from '../../../dto/post.dto';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { ApiService } from '../../../services/api.service';

const DEFAULT_POST: PostInputDto = { title: '', body: '', userId: 1 };

@Component({
  selector: 'app-post-create',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, Field, TranslocoPipe],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostCreate implements CanComponentDeactivate {
  private readonly snackBar = inject(MatSnackBar);
  private readonly apiService = inject(ApiService);
  private readonly confirm = inject(ConfirmDialogService);

  public readonly model = signal(DEFAULT_POST);
  public readonly form = form(this.model, (path) => [required(path.title), required(path.body)]);

  public canDeactivate(): Observable<boolean> | boolean {
    return (
      !this.form().dirty ||
      this.confirm.open('Discard changes?', 'You have unsaved changes. Do you really want to leave?')
    );
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.apiService.create(this.form().value()).subscribe((post) => {
      this.form().reset(post);
      this.snackBar.open('Post updated', 'Close');
    });
  }

  public onReset(event: Event): void {
    event.preventDefault();
    this.form().reset(DEFAULT_POST);
  }
}
