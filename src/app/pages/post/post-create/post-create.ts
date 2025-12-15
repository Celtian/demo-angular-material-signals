import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  imports: [],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreate {}
