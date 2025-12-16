import { UpperCasePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { UserInfo } from '../../../components/user-info/user-info';
import { API_URL } from '../../../constant/api.constant';
import { ROUTE_DEFINITION } from '../../../constant/route-definition.constant';
import { ExpandedPostDto } from '../../../dto/post.dto';

@Component({
  selector: 'app-post-detail',
  imports: [MatCardModule, MatIcon, MatButtonModule, TranslocoPipe, UpperCasePipe, RouterLink, UserInfo],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostDetail {
  public readonly ROUTE_DEFINITION = ROUTE_DEFINITION;

  public readonly id = input.required<number>();
  public readonly resource = httpResource<ExpandedPostDto>(() => `${API_URL}/posts/${this.id()}?_expand=user`);

  public onDelete() {
    throw new Error('Method not implemented.');
  }
}
