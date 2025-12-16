import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-create',
  imports: [MatCardModule],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto py-4 space-y-2' },
})
export class PostCreate {}
