import jwt from 'jsonwebtoken';
import UserModel from '../user/UserModel.js';
import AuthModel from '../auth/AuthModel.js';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const generateToken = (userId) => `Bearer ${jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1m',
})}`;
export const generateRefreshToken = (userId) => `Bearer ${jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
})}`;
export const verifyRefreshToken = async (refreshToken) => {
    try {
        const refreshTokenInDB = await AuthModel.exists({ refreshToken });
        if (!refreshTokenInDB?._id) {
            return null;
        }
        return jwt.verify(refreshToken.substring(7), JWT_REFRESH_SECRET);
    }
    catch (err) {
        return null;
    }
};
export const getUser = async (token, refreshToken, res) => {
    if (!token) {
        return {
            user: null,
        };
    }
    try {
        const decodedToken = jwt.verify(token.substring(7), JWT_SECRET);
        const user = await UserModel.findById(decodedToken.userId);
        return {
            user,
        };
    }
    catch (err) {
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
