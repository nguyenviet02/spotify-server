import userTypes from './user/UserTypes.js';
import type { UserType } from './user/UserTypes.js';

export type Context = {
  user?: UserType,
};

const queryTypes = `
  type Query {
    me: User
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    userAdd(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
  }
`;

const globalQuery = [userTypes, queryTypes];

export default globalQuery;