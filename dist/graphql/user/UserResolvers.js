import UserModel from './UserModel.js';
import dateScalar from '../custom-scalars/index.js';
const userResolvers = {
    Date: dateScalar,
    Query: {
        async me(_, __, context) {
            return context.user;
        },
        async user(_, { _id }) {
            return UserModel.findById(_id);
        },
        async users() {
            return await UserModel.find();
        },
    },
    Mutation: {},
};
export default userResolvers;
