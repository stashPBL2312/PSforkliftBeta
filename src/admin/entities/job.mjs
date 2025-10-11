import { EntitySchema } from '@mikro-orm/core';

export class Job {}

export const JobSchema = new EntitySchema({
  class: Job,
  tableName: 'jobs',
  properties: {
    id: { type: 'number', primary: true },
    jenis: { type: 'string', nullable: true },
    forklift_id: { type: 'number' },
    tanggal: { type: 'string' },
    teknisi: { type: 'string', nullable: true },
    report_no: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    recommendation: { type: 'string', nullable: true },
    items_used: { type: 'string', nullable: true },
    next_pm: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
  },
});