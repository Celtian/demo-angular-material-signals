import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { API_URL } from '../../constant/api.constant';
import { UserDto } from '../../dto/user.dto';
import { UserInfo } from '../user-info/user-info';

@Component({
  selector: 'app-post-list-detail',
  imports: [TranslocoPipe, UserInfo],
  templateUrl: './post-list-detail.html',
  styleUrl: './post-list-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListDetail {
  public readonly id = input.required<number>();
  public readonly resource = httpResource<UserDto>(() => `${API_URL}/users/${this.id()}`);
}
