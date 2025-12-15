import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  imports: [],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEdit {}
