import UserModel from '../user/UserModel.js';
import AuthModel from './AuthModel.js';
import { generateRefreshToken, generateToken } from '../utils/index.js';
const authResolver = {
    Query: {},
    Mutation: {
        async login(_, params) {
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
            }
            else {
                const refreshTokenDoc = new AuthModel({ refreshToken, user: user._id });
                await refreshTokenDoc.save();
            }
            return { token, refreshToken };
        },
        async register(_, params) {
            const user = new UserModel({ ...params.input });
            await user.save();
            const token = generateToken(user);
            const refreshToken = generateRefreshToken(user);
            return { token, refreshToken };
        },
    },
};
export default authResolver;
