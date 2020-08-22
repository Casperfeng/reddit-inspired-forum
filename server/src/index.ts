import { MikroORM } from '@mikro-orm/core';
import { configEnv } from './config';
import microConfig from './mikro-orm.config';
import { Post } from './entities/Post';

const main = async () => {
  configEnv();

  const orm = await MikroORM.init(microConfig);
};

main().catch((err) => console.error(err));
