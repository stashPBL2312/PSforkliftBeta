import { EntitySchema } from '@mikro-orm/core';

export class Record {}

export const RecordSchema = new EntitySchema({
  class: Record,
  tableName: 'records',
  properties: {
    id: { type: 'number', primary: true },
    tanggal: { type: 'string' },
    report_no: { type: 'string', nullable: true },
    forklift_id: { type: 'number' },
    pekerjaan: { type: 'string' },
    teknisi: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    recommendation: { type: 'string', nullable: true },
    items_used: { type: 'string', nullable: true },
    location: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
  },
});