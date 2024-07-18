export var UserGender;
(function (UserGender) {
    UserGender[UserGender["MALE"] = 0] = "MALE";
    UserGender[UserGender["FEMALE"] = 1] = "FEMALE";
    UserGender[UserGender["OTHERS"] = 2] = "OTHERS";
    UserGender[UserGender["SECRET"] = 3] = "SECRET";
})(UserGender || (UserGender = {}));
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
