import userResolvers from './user/UserResolvers';
import authResolver from './auth/AuthResolvers';
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
