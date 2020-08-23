import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import microConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const app = express();
  app.listen(8000, () => {
    console.log('Server is running on localhost:8000');
  });
};

main().catch((err) => console.error(err));
