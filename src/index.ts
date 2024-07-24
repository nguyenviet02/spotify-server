import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import globalQuery from './graphql/TypeDefinitions.js';
import globalResolvers from './graphql/GlobalResolvers.js';
import 'dotenv/config';
import connectToDB from './db/dbConnector.js';
import { getUser } from './graphql/utils/index.js';

interface MyContext {
  token?: String;
}

// Required logic for integrating with Express
const app = express();
const PORT = process.env.PORT;
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs: globalQuery,
  resolvers: globalResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
await connectToDB();

app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: true,
    credentials: true,
  }),
  express.json({ limit: '50mb' }),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      const token = req.headers.authorization || '';
      const refreshToken = req.headers['x-refresh-token'] as string;
      const user = await getUser(token, refreshToken, res);
      return user;
    },
  })
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: Number(PORT) }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/`);
