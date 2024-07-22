import UserModel from '../user/UserModel.js';
import AuthModel from './AuthModel.js';
import type { TUserLoginInput, TUserTypeInput } from '../user/UserTypes.js';
import type { TUserAuth } from './AuthTypes.js';
import { generateRefreshToken, generateToken } from '../utils/index.js';

const authResolver = {
  Query: {},
  Mutation: {
    async user_login(_: any, params: TUserLoginInput): Promise<TUserAuth> {
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
    async user_register(_: any, params: TUserTypeInput): Promise<TUserAuth> {
      const user = new UserModel({ ...params.input });
      await user.save();
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      return { token, refreshToken };
    },
  },
};

export default authResolver;
