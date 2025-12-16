import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-edit',
  imports: [MatCardModule],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto py-4 space-y-2' },
})
export class PostEdit {}
