import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserGender } from './UserTypes';

interface UserInterface extends mongoose.Document {
  name: string;
  password: string;
  email: string;
	dateOfBirth: Date;
	gender: UserGender;
  encryptPassword(password: string): string;
  authenticate(plainTextPassword: string): boolean;
}

const Schema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'users',
  }
);

Schema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

Schema.pre<UserInterface>('save', function (next) {
  // Hash the password]
  const user = this;
  if (user.isModified('password')) {
    this.password = user.encryptPassword(this.password);
  }

  return next();
});

export default mongoose.model<UserInterface>('User', Schema);
