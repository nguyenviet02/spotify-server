import userResolvers from './user/UserResolvers.js';
import authResolver from './auth/AuthResolvers.js';

const globalResolvers = {
  Query: {
    ...userResolvers.Query,
		...authResolver.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
		...authResolver.Mutation,
  },
};

export default globalResolvers;