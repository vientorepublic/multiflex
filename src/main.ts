import 'dotenv/config';
import { Bootstrap } from './server';
import { normalizePort } from './libraries/normalize_port';

const port = normalizePort(process.env.PORT);

new Bootstrap(port).start();
