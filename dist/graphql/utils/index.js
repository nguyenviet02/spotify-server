import jwt from 'jsonwebtoken';
import UserModel from '../user/UserModel.js';
import AuthModel from '../auth/AuthModel.js';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const generateToken = (user) => `Bearer ${jwt.sign({ data: user?._id }, JWT_SECRET, {
    expiresIn: '1d',
})}`;
export const generateRefreshToken = (user) => `Bearer ${jwt.sign({ data: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
})}`;
export const verifyRefreshToken = (refreshToken) => {
    try {
        const refreshTokenInDB = AuthModel.find({ refreshToken });
        if (!refreshTokenInDB) {
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
        const user = await UserModel.findById(decodedToken.data);
        return {
            user,
        };
    }
    catch (err) {
        const decodedRefreshToken = verifyRefreshToken(refreshToken);
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
