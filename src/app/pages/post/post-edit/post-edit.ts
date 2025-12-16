import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { API_URL } from '../../../constant/api.constant';
import { ROUTE_DEFINITION } from '../../../constant/route-definition.constant';
import { PostDto } from '../../../dto/post.dto';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { ApiService } from '../../../services/api.service';

const DEFAULT_POST: Pick<PostDto, 'title' | 'body'> = { title: '', body: '' };

@Component({
  selector: 'app-post-edit',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, Field, TranslocoPipe],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostEdit implements CanComponentDeactivate {
  private readonly snackBar = inject(MatSnackBar);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly confirm = inject(ConfirmDialogService);

  public readonly id = input.required<number>();
  public readonly model = signal(DEFAULT_POST);
  public readonly form = form(this.model, (path) => [required(path.title), required(path.body)]);
  public readonly resource = httpResource<PostDto>(() => `${API_URL}/posts/${this.id()}`);

  constructor() {
    effect(() => this.form().value.set(this.resource.value() ?? DEFAULT_POST));
  }

  public canDeactivate(): Observable<boolean> | boolean {
    return (
      !this.form().dirty ||
      this.confirm.open('Discard changes?', 'You have unsaved changes. Do you really want to leave?')
    );
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.apiService.patch(this.id(), this.form().value()).subscribe((post) => {
      this.form().reset(post);
      this.snackBar.open('Post updated', 'Close');
    });
  }

  public onReset(event: Event): void {
    event.preventDefault();
    this.form().reset(this.resource.value() ?? DEFAULT_POST);
  }

  public onDelete() {
    this.apiService.delete(this.id()).subscribe(() => {
      this.snackBar.open('Post deleted', 'Close');
      this.router.navigate(['/', ROUTE_DEFINITION.APP.POSTS]);
    });
  }
}
