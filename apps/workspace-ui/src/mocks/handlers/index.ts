import { handlers as loginHandlers } from 'apps/login-ui/src/mocks/handlers/login';
import { handlers as orgHandlers } from './organization';
import { handlers as userHandlers } from './user';

export const handlers = [...loginHandlers, ...orgHandlers, ...userHandlers];
