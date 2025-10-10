import { EntitySchema } from '@mikro-orm/core';

// Minimal entity untuk tabel forklifts sesuai schema.sql
export class Forklift {}

export const ForkliftSchema = new EntitySchema({
  class: Forklift,
  tableName: 'forklifts',
  properties: {
    id: { type: 'number', primary: true },
    brand: { type: 'string', nullable: true },
    type: { type: 'string', nullable: true },
    eq_no: { type: 'string', nullable: true, unique: true },
    serial: { type: 'string', nullable: true, unique: true },
    location: { type: 'string', nullable: true },
    powertrain: { type: 'string', nullable: true },
    owner: { type: 'string', nullable: true },
    tahun: { type: 'number', nullable: true },
    status: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
  },
});