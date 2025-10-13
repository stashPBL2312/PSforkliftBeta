import { EntitySchema } from '@mikro-orm/core';

export class ArchiveWorkshopJob {}

export const ArchiveWorkshopJobSchema = new EntitySchema({
  class: ArchiveWorkshopJob,
  tableName: 'archive_workshop_jobs',
  properties: {
    id: { type: 'number', primary: true },
    forklift_id: { type: 'number', nullable: true },
    tanggal: { type: 'string', nullable: true },
    pekerjaan: { type: 'string', nullable: true },
    notes: { type: 'string', nullable: true },
    item_dipakai: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
    report_no: { type: 'string', nullable: true },
  },
});