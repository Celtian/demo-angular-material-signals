import { Routes } from '@angular/router';
import { marker as _ } from '@jsverse/transloco-keys-manager/marker';
import { ROUTE_DEFINITION } from './constant/route-definition.constant';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';

export const BREADCRUMBS = {
  LIST: _('breadcrumb.list'),
  CREATE: _('breadcrumb.create'),
  EDIT: _('breadcrumb.edit'),
  NOT_FOUND: _('breadcrumb.not-found'),
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/post/post-list/post-list').then((m) => m.PostList),
    data: {
      breadcrumb: {
        label: BREADCRUMBS.LIST,
        info: {
          translate: true,
        },
      },
    },
  },
  {
    path: ROUTE_DEFINITION.POSTS.CREATE,
    loadComponent: () => import('./pages/post/post-create/post-create').then((m) => m.PostCreate),
    data: {
      breadcrumb: {
        label: BREADCRUMBS.CREATE,
        info: {
          translate: true,
        },
      },
    },
    canDeactivate: [CanDeactivateGuardService],
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/post/post-detail/post-detail').then((m) => m.PostDetail),
      },
      {
        path: ROUTE_DEFINITION.POSTS.EDIT,
        loadComponent: () => import('./pages/post/post-edit/post-edit').then((m) => m.PostEdit),
        canDeactivate: [CanDeactivateGuardService],
        data: {
          breadcrumb: {
            label: BREADCRUMBS.EDIT,
            info: {
              translate: true,
            },
          },
        },
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    data: {
      breadcrumb: {
        label: BREADCRUMBS.NOT_FOUND,
        info: {
          translate: true,
        },
      },
    },
  },
];
