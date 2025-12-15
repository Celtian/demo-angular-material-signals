import { RouteDefinitionDto } from '../dto/route.dto';

export const ROUTE_DEFINITION: RouteDefinitionDto<string> = {
  APP: {
    POSTS: 'posts',
    NOT_FOUND: 'not-found',
  },
  POSTS: {
    DETAIL: 'detail',
    CREATE: 'create',
    EDIT: 'edit',
  },
};
