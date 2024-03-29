import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, isProd } from './constants';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import typeOrmConfig from './type-orm.config';

const main = async () => {
  const connection = await createConnection(typeOrmConfig);

  if (connection) {
    console.log('connection created successfully');
  }

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client:  redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: 'lax', // related to csrf protection
        secure: isProd, //only works in https
      },
      saveUninitialized: false,
      //TODO hide secret in .env
      secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : '',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res })=> ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(8000, () => {
    console.log('server started on localhost:8000');
  });
};

main().catch((err) => console.error(err));
