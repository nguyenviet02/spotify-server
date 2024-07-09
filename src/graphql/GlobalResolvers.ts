import userResolvers from './user/UserResolvers';

const globalResolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

export default globalResolvers;