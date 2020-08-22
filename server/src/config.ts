import * as dotenv from 'dotenv';
import { isProd } from './constants';

export const configEnv = () => {
  isProd
    ? dotenv.config({ path: './.env' })
    : dotenv.config({ path: './.env.prod' });
};
