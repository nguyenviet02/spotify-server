import UserModel from './UserModel';
import type { UserAuth, UserLoginInput, UserType, UserTypeInput } from './UserTypes';
import type { Context } from '../TypeDefinitions';
import dateScalar from '../custom-scalars';
import { generateToken } from '../utils';

const userResolvers = {
  Date: dateScalar,
  Query: {
    async me(_: UserType, __: any, context: Context): Promise<UserType> {
      return context.user;
    },
    async user(_: UserType, { _id }: { _id: string }): Promise<UserType> {
      return UserModel.findById(_id);
    },
    async users(): Promise<UserType[]> {
      return await UserModel.find();
    },
  },
  Mutation: {
    async register(_: any, params: UserTypeInput): Promise<UserAuth> {
      const user = new UserModel({ ...params.input });
      await user.save();
      return {token: generateToken(user)} ;
    },
    async login(_: any, params: UserLoginInput): Promise<UserAuth> {
      const { email, password } = params.input;
      const user = await UserModel.findOne({ email });
      if (!user || !user.authenticate(password)) {
        throw new Error('Invalid email or password');
      }
      return {token: generateToken(user)};
    },
  },
};

export default userResolvers;
