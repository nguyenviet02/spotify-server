import { UserGender } from "../user/UserTypes";

export type TUserAuth = {
  token: string;
  refreshToken: string;
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

export type TCheckExistUserInput = {
	input: {
		email?: string;
		phoneNumber?: string;
	};
};

const authTypes = `
	type UserAuth {
  	token: String
		refreshToken: String
  }

	type CheckExistUser {
		email: Boolean
		phoneNumber: Boolean
	}

	input CheckExistUserInput {
		email: String
		phoneNumber: String
	}
	
	input UserRegisterInput {
		displayName: String!
		email: String
		phoneNumber: String
		password: String!
		dateOfBirth: Date!
		gender: Gender!
		notGetMarketingMessage: Boolean!
		shareData: Boolean!
	}

	input UserLoginInput {
		email: String!
		password: String!
	}

	type Mutation {
		user_register(input: UserRegisterInput): UserAuth
    user_login(input: UserLoginInput): UserAuth
		user_checkExistUser(input: CheckExistUserInput): CheckExistUser
  }
`;

export default authTypes;
