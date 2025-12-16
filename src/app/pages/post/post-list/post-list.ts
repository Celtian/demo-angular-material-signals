import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Params, Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { PostDto } from '../../../dto/post.dto';

@Component({
  selector: 'app-post-list',
  imports: [MatPaginatorModule, MatTableModule, MatSortModule, TranslocoPipe],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block container py-4 space-y-2' },
})
export class PostList {
  private readonly router = inject(Router);

  public readonly pageSize = input(5);
  public readonly pageIndex = input(1);

  public sortBy = signal<keyof PostDto>('id');
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public readonly displayedColumns: string[] = ['id', 'title', 'actions'];
  public readonly displayedColumnsExpanded = [...this.displayedColumns, 'expand'];
  public readonly pageSizeOptions = [5, 10, 25, 100];
  public readonly totalCount = signal(0);

  public readonly resource = httpResource<PostDto[]>(
    () => `https://jsonplaceholder.typicode.com/posts?_limit=${this.pageSize()}&_page=${this.pageIndex()}`,
  );

  public trackByPostId(_: number, target: PostDto): string | number {
    return target.id;
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
