import { EntitySchema } from '@mikro-orm/core';

export class ArchiveMaintenanceJob {}

export const ArchiveMaintenanceJobSchema = new EntitySchema({
  class: ArchiveMaintenanceJob,
  tableName: 'archive_maintenance_jobs',
  properties: {
    id: { type: 'number', primary: true },
    forklift_id: { type: 'number', nullable: true },
    tanggal: { type: 'string', nullable: true },
    pekerjaan: { type: 'string', nullable: true },
    recommendation: { type: 'string', nullable: true },
    next_pm: { type: 'string', nullable: true },
    report_no: { type: 'string', nullable: true },
    scanned_documents: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
  },
});