import jwt, { JwtPayload } from 'jsonwebtoken';
import type { TUserType } from '../user/UserTypes';
import UserModel from '../user/UserModel';
import AuthModel from '../auth/AuthModel';
import { ServerResponse } from 'http';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const generateToken = (user: TUserType) =>
  `Bearer ${jwt.sign({ data: user?._id }, JWT_SECRET, {
    expiresIn: '1d',
  })}`;

export const generateRefreshToken = (user: TUserType) =>
  `Bearer ${jwt.sign({ data: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  })}`;

export const verifyRefreshToken = (refreshToken: string) => {
  // Nếu không có refreshToken trong DB hoặc refreshToken hết hạn thì trả về null
  try {
    const refreshTokenInDB = AuthModel.find({ refreshToken });
    if (!refreshTokenInDB) {
      return null;
    }
    return jwt.verify(refreshToken.substring(7), JWT_REFRESH_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
};

export const getUser = async (token: string, refreshToken: string, res: ServerResponse) => {
  if (!token) {
    return {
      user: null,
    };
  }

  try {
    const decodedToken = jwt.verify(token.substring(7), JWT_SECRET) as JwtPayload;
    const user = await UserModel.findById(decodedToken.data);
    return {
      user,
    };
  } catch (err) {
    const decodedRefreshToken = verifyRefreshToken(refreshToken);
    console.log('☠️ ~ getUser ~ decodedRefreshToken:', decodedRefreshToken)
    if (!decodedRefreshToken) {
      return {
        user: null,
      };
    }
    const user = await UserModel.findById(decodedRefreshToken.data);
    const newToken = generateToken(user);
    res.setHeader('Authorization', newToken);
  }
};
