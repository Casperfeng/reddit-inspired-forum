import { MikroORM } from '@mikro-orm/core';
import { configEnv } from './config';
import microConfig from './mikro-orm.config';

const main = async () => {
  configEnv();
  const orm = await MikroORM.init(microConfig);
};

main().catch((err) => console.error(err));
