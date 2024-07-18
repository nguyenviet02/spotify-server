import UserModel from './UserModel.js';
import type { TUserType } from './UserTypes.js';
import type { TContext } from '../TypeDefinitions.js';
import dateScalar from '../custom-scalars/index.js';

const userResolvers = {
  Date: dateScalar,
  Query: {
    async me(_: TUserType, __: any, context: TContext): Promise<TUserType> {
      return context.user;
    },
    async user(_: TUserType, { _id }: { _id: string }): Promise<TUserType> {
      return UserModel.findById(_id);
    },
    async users(): Promise<TUserType[]> {
      return await UserModel.find();
    },
  },
  Mutation: {},
};

export default userResolvers;
