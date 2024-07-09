import UserModel from './UserModel';
import type { UserType } from './UserTypes';
import type { Context } from '../TypeDefinitions';

const userResolvers = {
  Query: {
    async me(_: UserType, __: any, context: Context): Promise<UserType> {
      return context.user;
    },
    async user(_: UserType, { id }: { id: string }): Promise<UserType> {
      return UserModel.findById(id);
    },
    async users(): Promise<UserType[]> {
      return await UserModel.find();
    },
  },
  Mutation: {
    async userAdd(_: any, { name, email, password }: { name: string; email: string; password: string }): Promise<UserType> {
      const user = new UserModel({ name, email, password });
      await user.save();
      return user;
    },
    async login(_: any, { email, password }: { email: string; password: string }): Promise<UserType> {
      const user = await UserModel.findOne({ email });
      if (!user || !user.authenticate(password)) {
        throw new Error('Invalid email or password');
      }
      return user;
    },
  },
};

export default userResolvers;
