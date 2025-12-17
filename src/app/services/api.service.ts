import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../constant/api.constant';
import { Pagination } from '../dto/pagination.dto';
import { ExpandedPostDto, PostDto, PostInputDto } from '../dto/post.dto';
import { UserDto } from '../dto/user.dto';

export interface PostListInput {
  page: number;
  limit: number;
  sort: keyof PostDto;
  order: 'asc' | 'desc';
  query: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  public list(input: PostListInput): Observable<Pagination<PostDto>> {
    const params = [`_limit=${input.limit}`, `_sort=${input.sort}`, `_order=${input.order}`];

    if (input.page > 0) {
      params.push(`_page=${input.page}`);
    }

    if (input.query) {
      params.push(`title_like=${input.query}`);
      // params.push(`body_like=${query}`);
      // params.push(`_q=${query}`);
    }

    return this.http
      .get<PostDto[]>(`${API_URL}/posts?${params.join('&')}`, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          return {
            totalCount: Number(res.headers.get('x-total-count')) || 0,
            items: res.body || [],
          };
        }),
      );
  }

  public detail(id: number): Observable<PostDto> {
    return this.http.get<PostDto>(`${API_URL}/posts/${id}`);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/posts/${id}`);
  }

  public patch(id: number, body: Partial<PostDto>): Observable<PostDto> {
    return this.http.patch<PostDto>(`${API_URL}/posts/${id}`, body);
  }

  public create(post: PostInputDto): Observable<PostDto> {
    return this.http.post<PostDto>(`${API_URL}/posts`, post);
  }

  public detailExpanded(id: number): Observable<ExpandedPostDto> {
    return this.http.get<ExpandedPostDto>(`${API_URL}/posts/${id}?_expand=user`);
  }

  public user(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${API_URL}/users/${id}`);
  }
}
