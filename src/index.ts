import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';

import globalQuery from './graphql/TypeDefinitions';
import globalResolvers from './graphql/GlobalResolvers';
import connectToDB from './db/dbConnector';
import { getUser } from './graphql/utils';

// Khởi tạo server apollo
const PORT = process.env.DEV_PORT;
const server = new ApolloServer({
  typeDefs: globalQuery,
  resolvers: globalResolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: Number(PORT) },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUser(token);
    return user ;
  },
});

// Kết nối tới database
connectToDB();

console.log(`🚀  Server ready at: ${url}`);
