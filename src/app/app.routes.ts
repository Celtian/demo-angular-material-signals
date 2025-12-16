import { Routes } from '@angular/router';
import { ROUTE_DEFINITION } from './constant/route-definition.constant';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/post/post-list/post-list').then((m) => m.PostList),
    data: {
      breadcrumb: 'List',
    },
  },
  {
    path: ROUTE_DEFINITION.POSTS.CREATE,
    loadComponent: () => import('./pages/post/post-create/post-create').then((m) => m.PostCreate),
    data: {
      breadcrumb: 'Create',
    },
    canDeactivate: [CanDeactivateGuardService],
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/post/post-detail/post-detail').then((m) => m.PostDetail),
    data: {
      breadcrumb: 'Detail',
    },
  },
  {
    path: `:id/${ROUTE_DEFINITION.POSTS.EDIT}`,
    loadComponent: () => import('./pages/post/post-edit/post-edit').then((m) => m.PostEdit),
    data: {
      breadcrumb: 'Edit',
    },
    canDeactivate: [CanDeactivateGuardService],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    data: {
      breadcrumb: 'Not Found',
    },
  },
];
