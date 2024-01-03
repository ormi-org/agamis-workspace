import { handlers as loginHandlers } from '@agamis/workspace/shared/login/msw-handlers';
import { handlers as orgHandlers } from './organization';
import { handlers as userHandlers } from './user';

export const handlers = [...loginHandlers, ...orgHandlers, ...userHandlers];
