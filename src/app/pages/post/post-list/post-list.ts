import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Params, Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { filter, switchMap } from 'rxjs';
import { PostListDetail } from '../../../components/post-list-detail/post-list-detail';
import { ROUTE_DEFINITION } from '../../../constant/route-definition.constant';
import { TypeSafeMatCellDef } from '../../../directives/type-safe-mat-cell-def.directive';
import { PostDto } from '../../../dto/post.dto';
import { ApiService, PostListInput } from '../../../services/api.service';
import { CustomConfirmDialogService } from '../../../services/custom-confirm-dialog.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-post-list',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    TranslocoPipe,
    TypeSafeMatCellDef,
    PostListDetail,
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container m-auto p-4 space-y-2' },
})
export class PostList {
  public readonly ROUTE_DEFINITION = ROUTE_DEFINITION;

  private readonly notification = inject(NotificationService);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly confirm = inject(CustomConfirmDialogService);

  public readonly pageSize = input(5, { transform: (value) => coerceNumberProperty(value, 5) });
  public readonly pageIndex = input(1, { transform: (value) => coerceNumberProperty(value, 1) });
  public readonly query = input('', { transform: (value: string) => (value ? decodeURIComponent(value) : '') });

  public readonly sortBy = input('id', {
    transform: (value: string): keyof PostDto => (['id', 'title'].includes(value) ? (value as keyof PostDto) : 'id'),
  });
  public readonly sortDirection = input('asc', {
    transform: (value: string): 'asc' | 'desc' => (['asc', 'desc'].includes(value) ? (value as 'asc' | 'desc') : 'asc'),
  });

  public readonly expandedElement = signal<PostDto | null>(null);

  public readonly displayedColumns: string[] = ['id', 'title', 'actions'];
  public readonly displayedColumnsExpanded = [...this.displayedColumns, 'expand'];
  public readonly pageSizeOptions = [5, 10, 25, 100];

  public readonly resource = rxResource({
    params: (): PostListInput => {
      return {
        limit: this.pageSize(),
        page: this.pageIndex(),
        sort: this.sortBy(),
        order: this.sortDirection(),
        query: this.query(),
      };
    },
    stream: ({ params }) => this.apiService.list(params),
  });

  public readonly dataSource = computed(() => this.resource.value()?.items ?? []);
  public readonly totalCount = computed(() => this.resource.value()?.totalCount ?? 0);

  public trackByPostId(_: number, target: PostDto): string | number {
    return target.id;
  }

  public onExpand(event: Event, element: PostDto): void {
    this.expandedElement.set(this.expandedElement() === element ? null : element);
    event.stopPropagation();
  }

  public onSortChange(event: Sort): void {
    this.setFiltersToRoute({
      sortBy: event.active === 'id' ? null : event.active,
      sortDirection: event.direction === 'desc' ? event.direction : null,
      pageIndex: null,
    });
  }

  public onPageChange(event: PageEvent): void {
    let pageIndex = null;
    if (event.pageSize === this.pageSize()) {
      pageIndex = event.pageIndex + 1 > 1 ? event.pageIndex + 1 : null;
    }
    this.setFiltersToRoute({
      pageIndex,
      pageSize: event.pageSize === 5 ? null : event.pageSize,
    });
  }

  private setFiltersToRoute(queryParams?: Params | null): void {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  public onDelete(id: number) {
    this.confirm
      .open('DELETE')
      .pipe(
        filter((confirmed) => !!confirmed),
        switchMap(() => this.apiService.delete(id)),
      )
      .subscribe(() => this.notification.success('DELETE'));
  }

  public onClear(): void {
    this.setFiltersToRoute({
      query: null,
      pageIndex: null,
      pageSize: null,
      sortBy: null,
      sortDirection: null,
    });
  }

  public onQueryChange(query: string): void {
    this.setFiltersToRoute({
      query: query ? encodeURIComponent(query) : null,
      pageIndex: null,
    });
  }
}
