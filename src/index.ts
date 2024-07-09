import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';

import globalQuery from './graphql/TypeDefinitions';
import globalResolvers  from './graphql/GlobalResolvers';
import connectToDB from './db/dbConnector';

// Khởi tạo server apollo
const PORT = process.env.DEV_PORT;
console.log('☠️ ~ PORT:', PORT)
const server = new ApolloServer({
  typeDefs: globalQuery,
	resolvers: globalResolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: Number(PORT) },
});

// Kết nối tới database
connectToDB();

console.log(`🚀  Server ready at: ${url}`);