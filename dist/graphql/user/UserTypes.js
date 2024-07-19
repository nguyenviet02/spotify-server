export var UserGender;
(function (UserGender) {
    UserGender[UserGender["MALE"] = 0] = "MALE";
    UserGender[UserGender["FEMALE"] = 1] = "FEMALE";
    UserGender[UserGender["NO_GENDER"] = 2] = "NO_GENDER";
    UserGender[UserGender["OTHERS"] = 3] = "OTHERS";
    UserGender[UserGender["SECRET"] = 4] = "SECRET";
})(UserGender || (UserGender = {}));
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
