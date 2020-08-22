import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { Post } from './entities/Post';
import { isProd } from './constants';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_PASSWORD,
  password: process.env.POSTGRES_USER,
  debug: !isProd,

  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];
