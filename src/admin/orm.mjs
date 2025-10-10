import { MikroORM } from '@mikro-orm/sqlite';
import { ForkliftSchema, Forklift } from './entities/forklift.mjs';
import { fileURLToPath } from 'node:url';

// Resolve path ke db.sqlite di root project (dua level ke atas dari file ini)
const rootUrl = new URL('../../', import.meta.url);
const dbUrl = new URL('db.sqlite', rootUrl);
const dbPath = fileURLToPath(dbUrl);

// MikroORM (Windows): beberapa util membaca clientUrl via new URL(),
// gunakan skema file:/// dan path POSIX agar valid.
const posixPath = dbPath.replace(/\\/g, '/');
const clientUrl = `file:///${posixPath}`;

export async function initOrm() {
  const orm = await MikroORM.init({
    dbName: dbPath,
    clientUrl,
    entities: [ForkliftSchema],
    debug: false,
  });
  return orm;
}

export { Forklift };