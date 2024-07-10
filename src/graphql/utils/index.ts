import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../user/UserTypes';
import UserModel from '../user/UserModel';

const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (user: UserType) => `Bearer ${jwt.sign({ data: user.email }, JWT_SECRET, {
	expiresIn: '1d',
})}`;

export const getUser = async (token: string) => {
  if (!token) {
    return {
      user: null,
    };
  }

  try {
    const decodedToken = jwt.verify(token.substring(7), JWT_SECRET) as JwtPayload;

    const user = await UserModel.findOne({ email: decodedToken.data });

    return {
      user,
    };
  } catch (err) {
    return {
      user: null,
    };
  }
};