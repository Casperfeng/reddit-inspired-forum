import { Post } from './entities/Post';
import { isProd } from './constants';

export default {
  entities: [Post],
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_PASSWORD,
  password: process.env.POSTGRES_USER,
  debug: !isProd,
  type: 'postgresql',
} as const;
