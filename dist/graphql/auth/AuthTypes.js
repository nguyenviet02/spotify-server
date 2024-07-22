const authTypes = `
	type UserAuth {
  	token: String
		refreshToken: String
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
		User_register(input: UserRegisterInput): UserAuth
    User_login(input: UserLoginInput): UserAuth
  }
`;
export default authTypes;
