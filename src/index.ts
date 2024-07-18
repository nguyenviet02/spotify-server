import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';

import globalQuery from './graphql/TypeDefinitions.js';
import globalResolvers from './graphql/GlobalResolvers.js';
import connectToDB from './db/dbConnector.js';
import { getUser } from './graphql/utils/index.js';

// Khởi tạo server apollo
const PORT = process.env.PORT;
const server = new ApolloServer({
  typeDefs: globalQuery,
  resolvers: globalResolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: Number(PORT) },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || '';
		const refreshToken = req.headers['x-refresh-token'] as string;
    const user = await getUser(token, refreshToken, res);
    return user ;
  },
});

// Kết nối tới database
connectToDB();

console.log(`🚀  Server ready at: ${url}`);
