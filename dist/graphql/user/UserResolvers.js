import UserModel from './UserModel.js';
import dateScalar from '../custom-scalars/index.js';
const userResolvers = {
    Date: dateScalar,
    Query: {
        async user_me(_, __, context) {
            return context.user;
        },
        async user_getUserById(_, { _id }) {
            return UserModel.findById(_id);
        },
        async user_getUsers() {
            return await UserModel.find();
        },
    },
    Mutation: {},
};
export default userResolvers;
