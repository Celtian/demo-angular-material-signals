import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-post-edit',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, Field, TranslocoPipe, JsonPipe],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto py-4 space-y-2' },
})
export class PostEdit {
  public readonly model = signal({ title: '', content: '' });
  public readonly form = form(this.model, (path) => [required(path.title), required(path.content)]);

  public onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form().value());
  }
}
