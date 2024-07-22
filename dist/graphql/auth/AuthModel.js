import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    collection: 'auth',
});
export default mongoose.model('Auth', Schema);
