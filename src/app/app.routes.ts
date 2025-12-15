import { Routes } from '@angular/router';
import { ROUTE_DEFINITION } from './constant/route-definition.constant';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/post/post-list/post-list').then((m) => m.PostList),
  },
  {
    path: ROUTE_DEFINITION.POSTS.CREATE,
    loadComponent: () => import('./pages/post/post-create/post-create').then((m) => m.PostCreate),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/post/post-detail/post-detail').then((m) => m.PostDetail),
  },
  {
    path: `:id/${ROUTE_DEFINITION.POSTS.EDIT}`,
    loadComponent: () => import('./pages/post/post-edit/post-edit').then((m) => m.PostEdit),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
