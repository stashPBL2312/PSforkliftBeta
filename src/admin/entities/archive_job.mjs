import { EntitySchema } from '@mikro-orm/core';

export class ArchiveJob {}

export const ArchiveJobSchema = new EntitySchema({
  class: ArchiveJob,
  tableName: 'archive_jobs',
  properties: {
    id: { type: 'number', primary: true },
    job_no: { type: 'string' },
    job_source: { type: 'string', nullable: true },
    job_date: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    notes: { type: 'string', nullable: true },
    status: { type: 'string', nullable: true },
    forklift_id: { type: 'number', nullable: true },
    forklift_eq_no: { type: 'string', nullable: true },
    forklift_serial: { type: 'string', nullable: true },
    // Kolom untuk workshop_jobs
    tanggal: { type: 'string', nullable: true },
    pekerjaan: { type: 'string', nullable: true },
    item_dipakai: { type: 'string', nullable: true },
    report_no: { type: 'string', nullable: true },
    next_pm: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
  },
});