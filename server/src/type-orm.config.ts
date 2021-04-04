import { ConnectionOptions } from "typeorm";
import { configEnv } from "./config";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

configEnv();

export default {
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    logging: true,
    synchronize: true,
    entities: [Post, User]
  } as ConnectionOptions