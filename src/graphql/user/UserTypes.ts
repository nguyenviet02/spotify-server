export type TUserType = {
  _id: unknown;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: UserGender;
};

export type TUserTypeInput = {
  input: {
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: UserGender;
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
  OTHERS,
  SECRET,
}

const userTypes = `
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
	
	type Query {
    me: User
    user(_id: ID!): User
    users: [User]
  }
`;

export default userTypes;
