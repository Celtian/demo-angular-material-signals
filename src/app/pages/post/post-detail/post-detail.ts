import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-detail',
  imports: [MatCardModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostDetail {}
