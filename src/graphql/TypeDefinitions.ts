import userTypes from './user/UserTypes.js';
import type { UserType } from './user/UserTypes.js';

export type Context = {
  user?: UserType,
};

const globalQuery = [userTypes];

export default globalQuery;