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
