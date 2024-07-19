export type TUserType = {
  _id: unknown;
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

export type TUserTypeInput = {
  input: {
    displayName: string;
    email?: string;
    phoneNumber?: string;
    password: string;
    dateOfBirth: Date;
    gender: UserGender;
    notGetMarketingMessage: boolean;
    shareData: boolean;
  };
};

export type TUserLoginInput = {
  input: {
    email: string;
    password: string;
  };
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
		notGetMarketingMessage: Boolean
		shareData: Boolean
  }

	enum Gender {
		MALE
		FEMALE
		NO_GENDER
		OTHERS
		SECRET
	}
	
	type Query {
    me: User
    user(_id: ID!): User
    users: [User]
  }
`;

export default userTypes;
