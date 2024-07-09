export type UserType = {
  _id: unknown,
  name: string,
  email: string,
};

const userType = `
  type User {
    _id: String
    name: String
    email: String
  }

  type UserAuth {
    token: String
  }
`;

export default userType;