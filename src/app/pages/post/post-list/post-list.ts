import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Params, Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { PostListDetail } from '../../../components/post-list-detail/post-list-detail';
import { API_URL } from '../../../constant/api.constant';
import { ROUTE_DEFINITION } from '../../../constant/route-definition.constant';
import { TypeSafeMatCellDef } from '../../../directives/type-safe-mat-cell-def.directive';
import { PostDto } from '../../../dto/post.dto';

@Component({
  selector: 'app-post-list',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
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

  private readonly router = inject(Router);

  public readonly pageSize = input(5);
  public readonly pageIndex = input(1);

  public readonly sortBy = signal<keyof PostDto>('id');
  public readonly sortDirection = signal<'asc' | 'desc'>('asc');

  public readonly expandedElement = signal<PostDto | null>(null);

  public readonly displayedColumns: string[] = ['id', 'title', 'actions'];
  public readonly displayedColumnsExpanded = [...this.displayedColumns, 'expand'];
  public readonly pageSizeOptions = [5, 10, 25, 100];
  public readonly totalCount = signal(0);

  public readonly resource = httpResource<PostDto[]>(
    () => `${API_URL}/posts?_limit=${this.pageSize()}&_page=${this.pageIndex()}`,
  );

  public readonly dataSource = computed(() => this.resource.value() ?? []);

  public trackByPostId(_: number, target: PostDto): string | number {
    return target.id;
  }

  public onExpand(event: Event, element: PostDto): void {
    this.expandedElement.set(this.expandedElement() === element ? null : element);
    event.stopPropagation();
  }

  public onSortChange(event: Sort): void {
    console.log(event);
  }

  public onPageChange(event: PageEvent): void {
    console.log(event);
    let pageIndex = null;
    if (event.pageSize === this.pageSize()) {
      pageIndex = event.pageIndex + 1 > 1 ? event.pageIndex + 1 : null;
    }
    this.setFiltersToRoute({
      pageIndex,
      pageSize: event.pageSize,
    });
  }

  private setFiltersToRoute(queryParams?: Params | null): void {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
