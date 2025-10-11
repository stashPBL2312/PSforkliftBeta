import { EntitySchema } from '@mikro-orm/core';

export class Item {}

export const ItemSchema = new EntitySchema({
  class: Item,
  tableName: 'items',
  properties: {
    id: { type: 'number', primary: true },
    code: { type: 'string', unique: true },
    nama: { type: 'string', nullable: true },
    unit: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    status: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
  },
});