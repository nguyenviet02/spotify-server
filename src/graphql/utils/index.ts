import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import UserModel from '../user/UserModel.js';
import AuthModel from '../auth/AuthModel.js';
import { ServerResponse } from 'http';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const generateToken = (userId: Types.ObjectId) =>
  `Bearer ${jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1m',
  })}`;

export const generateRefreshToken = (userId: Types.ObjectId) =>
  `Bearer ${jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  })}`;

export const verifyRefreshToken = async (refreshToken: string) => {
  // Nếu không có refreshToken trong DB hoặc refreshToken hết hạn thì trả về null
  try {
    const refreshTokenInDB = await AuthModel.exists({ refreshToken });
    if (!refreshTokenInDB?._id) {
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
    const user = await UserModel.findById(decodedToken.userId);
    return {
      user,
    };
  } catch (err) {
    const decodedRefreshToken = await verifyRefreshToken(refreshToken);
    if (!decodedRefreshToken?.userId) {
      return {
        user: null,
      };
    }
    const user = await UserModel.findById(decodedRefreshToken?.userId);
    const newToken = generateToken(user?._id);
    res.setHeader('Authorization', newToken);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    return {
      user,
    };
  }
};
