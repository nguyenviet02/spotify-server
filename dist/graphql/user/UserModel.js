import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserGender } from './UserTypes.js';
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        index: true,
    },
    password: {
        type: String,
        hidden: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: UserGender,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    collection: 'users',
});
Schema.methods = {
    authenticate(plainTextPassword) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    },
    encryptPassword(password) {
        return bcrypt.hashSync(password, 8);
    },
};
Schema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        this.password = user.encryptPassword(this.password);
    }
    return next();
});
export default mongoose.model('User', Schema);
