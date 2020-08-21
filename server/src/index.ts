import { MikroORM } from '@mikro-orm/core';
import { isProd } from './constants';
import { configEnv } from './config';

const main = async () => {
  configEnv();

  const orm = await MikroORM.init({
    entities: [],
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_PASSWORD,
    password: process.env.POSTGRES_USER,
    debug: isProd,
    type: 'postgresql',
  });
};

main();
