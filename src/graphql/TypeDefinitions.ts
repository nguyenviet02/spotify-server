import userTypes from './user/UserTypes.js';
import authTypes from './auth/AuthTypes.js';
import type { TUserType } from './user/UserTypes.js';

export type TContext = {
  user?: TUserType,
};

const globalQuery = [userTypes, authTypes];

export default globalQuery;