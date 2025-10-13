import { MikroORM } from '@mikro-orm/sqlite';
import { ForkliftSchema, Forklift } from './entities/forklift.mjs';
import { UserSchema, User } from './entities/user.mjs';
import { ItemSchema, Item } from './entities/item.mjs';
import { JobSchema, Job } from './entities/job.mjs';
import { RecordSchema, Record } from './entities/record.mjs';
import { ArchiveJobSchema, ArchiveJob } from './entities/archive_job.mjs';
import { ArchiveWorkshopJobSchema, ArchiveWorkshopJob } from './entities/archive_workshop_job.mjs';
import { ArchiveMaintenanceJobSchema, ArchiveMaintenanceJob } from './entities/archive_maintenance_job.mjs';
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
    entities: [ForkliftSchema, UserSchema, ItemSchema, JobSchema, RecordSchema, ArchiveJobSchema, ArchiveWorkshopJobSchema, ArchiveMaintenanceJobSchema],
    debug: false,
  });
  return orm;
}

export { Forklift, User, Item, Job, Record, ArchiveJob, ArchiveWorkshopJob, ArchiveMaintenanceJob };