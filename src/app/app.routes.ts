import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { marker as _ } from '@jsverse/transloco-keys-manager/marker';
import { ROUTE_DEFINITION } from './constant/route-definition.constant';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';

export const BREADCRUMBS = {
  LIST: _('breadcrumb.list'),
  CREATE: _('breadcrumb.create'),
  EDIT: _('breadcrumb.edit'),
  DETAIL: _('breadcrumb.detail'),
  NOT_FOUND: _('breadcrumb.not-found'),
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/post/post-list/post-list').then((m) => m.PostList),
    title: () => {
      const transloco = inject(TranslocoService);
      return transloco.translate(BREADCRUMBS.LIST);
    },
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
    title: () => {
      const transloco = inject(TranslocoService);
      return transloco.translate(BREADCRUMBS.CREATE);
    },
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
        title: () => {
          const transloco = inject(TranslocoService);
          return transloco.translate(BREADCRUMBS.DETAIL);
        },
      },
      {
        path: ROUTE_DEFINITION.POSTS.EDIT,
        loadComponent: () => import('./pages/post/post-edit/post-edit').then((m) => m.PostEdit),
        canDeactivate: [CanDeactivateGuardService],
        title: () => {
          const transloco = inject(TranslocoService);
          return transloco.translate(BREADCRUMBS.EDIT);
        },
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
    title: () => {
      const transloco = inject(TranslocoService);
      return transloco.translate(BREADCRUMBS.NOT_FOUND);
    },
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
