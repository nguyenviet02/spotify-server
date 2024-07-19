export type TUserAuth = {
  token: string;
  refreshToken: string;
};

const authTypes = `
	type UserAuth {
  	token: String
		refreshToken: String
  }
	
	input UserInput {
		displayName: String!
		email: String
		phoneNumber: String
		password: String!
		dateOfBirth: Date!
		gender: Gender!
	}

	input UserLoginInput {
		email: String!
		password: String!
	}

	type Mutation {
		register(input: UserInput): UserAuth
    login(input: UserLoginInput): UserAuth
  }
`;

export default authTypes;
