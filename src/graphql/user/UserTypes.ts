import { Types } from 'mongoose';

export type TUserType = {
  _id: Types.ObjectId;
  displayName: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  dateOfBirth: Date;
  gender: UserGender;
  playlists?: string[];
  likedSongs?: string[];
  notGetMarketingMessage: boolean;
  shareData: boolean;
};

export enum UserGender {
  MALE,
  FEMALE,
  NO_GENDER,
  OTHERS,
  SECRET,
}

const userTypes = `
	scalar Date

  type User {
		_id: ID!
    displayName: String!
    email: String
		phoneNumber: String
		password: String!
		dateOfBirth: Date!
		gender: Gender!
		playlists: [ID]
		likedSongs: [ID]
		notGetMarketingMessage: Boolean!
		shareData: Boolean!
  }

	enum Gender {
		MALE
		FEMALE
		NO_GENDER
		OTHERS
		SECRET
	}
	
	type Query {
    user_me: User
    user_getUserById(_id: ID!): User
    user_getUsers: [User]
  }
`;

export default userTypes;
