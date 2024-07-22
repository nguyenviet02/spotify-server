import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserGender } from './UserTypes.js';

interface IUserSchema extends mongoose.Document {
	_id: Types.ObjectId;
  displayName: string;
  email: string;
  phoneNumber: string;
  password: string;
  dateOfBirth: Date;
  gender: UserGender;
  playlists: string[];
  likedSongs: string[];
  notGetMarketingMessage: boolean;
  shareData: boolean;
  encryptPassword(password: string): string;
  authenticate(plainTextPassword: string): boolean;
}

const Schema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
    },
    phoneNumber: {
      type: String,
      index: true,
    },
    password: {
      type: String,
      required: true,
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
    playlists: {
      type: [String],
      default: [],
    },
    likedSongs: {
      type: [String],
      default: [],
    },
    notGetMarketingMessage: {
      type: Boolean,
      default: false,
    },
    shareData: {
      type: Boolean,
      default: true,
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

Schema.pre<IUserSchema>('save', function (next) {
  // Hash the password]
  const user = this;
  if (user.isModified('password')) {
    this.password = user.encryptPassword(this.password);
  }

  return next();
});

export default mongoose.model<IUserSchema>('User', Schema);
