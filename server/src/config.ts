import * as dotenv from 'dotenv';
import path from 'path';
import { isProd } from './constants';

export const configEnv = () => {
  isProd
    ? dotenv.config({ path: path.join(__dirname, '../.env.prod') })
    : dotenv.config({ path: path.join(__dirname, '../.env') });
};
