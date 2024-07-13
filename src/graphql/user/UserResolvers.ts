import UserModel from './UserModel';
import type { TUserType } from './UserTypes';
import type { TContext } from '../TypeDefinitions';
import dateScalar from '../custom-scalars';

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
