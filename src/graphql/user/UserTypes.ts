export type UserType = {
  _id: unknown;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: UserGender;
};

export type UserTypeInput = {
  input: {
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: UserGender;
  };
};

export type UserAuth = {
  token: string;
};

export type UserLoginInput = {
  input: {
    email: string;
    password: string;
  };
};

export enum UserGender {
  MALE,
  FEMALE,
  OTHERS,
  SECRET,
}

const userType = `
	scalar Date

  type User {
		_id: ID!
    name: String!
    email: String!
		password: String
		dateOfBirth: Date
		gender: Gender!
  }

	enum Gender {
		MALE
		FEMALE
		OTHERS
		SECRET
	}

  type UserAuth {
    token: String
  }
	
	type Query {
    me: User
    user(_id: ID!): User
    users: [User]
  }

	input UserInput {
		name: String!
		email: String!
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

export default userType;
