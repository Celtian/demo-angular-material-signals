import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetail {}
