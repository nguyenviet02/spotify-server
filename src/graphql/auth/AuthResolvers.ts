import UserModel from '../user/UserModel';
import AuthModel from './AuthModel';
import type { TUserLoginInput, TUserTypeInput } from '../user/UserTypes';
import type { TUserAuth } from './AuthTypes';
import { generateRefreshToken, generateToken } from '../utils';

const authResolver = {
  Query: {},
  Mutation: {
    async login(_: any, params: TUserLoginInput): Promise<TUserAuth> {
      const { email, password } = params.input;
      const user = await UserModel.findOne({ email });
      if (!user || !user.authenticate(password)) {
        throw new Error('Invalid email or password');
      }
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      const refreshTokenInDB = await AuthModel.findOne({ user: user._id });
      if (refreshTokenInDB) {
        await refreshTokenInDB.updateOne({ refreshToken });
      } else {
        const refreshTokenDoc = new AuthModel({ refreshToken, user: user._id });
        await refreshTokenDoc.save();
      }
      return { token, refreshToken };
    },
    async register(_: any, params: TUserTypeInput): Promise<TUserAuth> {
      const user = new UserModel({ ...params.input });
      await user.save();
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      return { token, refreshToken };
    },
  },
};

export default authResolver;
