import { UpperCasePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { TextProgress } from '../../../components/text-progress/text-progress';
import { UserInfo } from '../../../components/user-info/user-info';
import { API_URL } from '../../../constant/api.constant';
import { ROUTE_DEFINITION } from '../../../constant/route-definition.constant';
import { ExpandedPostDto } from '../../../dto/post.dto';
import { ApiService } from '../../../services/api.service';
import { CustomConfirmDialogService } from '../../../services/custom-confirm-dialog.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-post-detail',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslocoPipe,
    UpperCasePipe,
    RouterLink,
    UserInfo,
    TextProgress,
  ],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostDetail {
  public readonly ROUTE_DEFINITION = ROUTE_DEFINITION;

  private readonly confirm = inject(CustomConfirmDialogService);
  private readonly notification = inject(NotificationService);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  public readonly id = input.required<number>();
  public readonly resource = httpResource<ExpandedPostDto>(() => `${API_URL}/posts/${this.id()}?_expand=user`);

  public readonly isDeleting = signal(false);
  public readonly isProcessing = computed(() => this.resource.isLoading() || this.isDeleting());

  public onDelete() {
    this.confirm
      .open('DELETE')
      .pipe(
        filter((confirmed) => !!confirmed),
        tap(() => this.isDeleting.set(true)),
        debounceTime(1000),
        switchMap(() => this.apiService.delete(this.id())),
        finalize(() => this.isDeleting.set(false)),
      )
      .subscribe(() => {
        this.notification.success('DELETE');
        this.router.navigate(['/']);
      });
  }
}
