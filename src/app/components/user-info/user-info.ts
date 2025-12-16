import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { UserDto } from '../../dto/user.dto';

@Component({
  selector: 'app-user-info',
  imports: [TranslocoPipe],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfo {
  public readonly user = input.required<UserDto>();
}
