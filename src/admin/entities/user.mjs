import { EntitySchema } from '@mikro-orm/core';

export class User {}

export const UserSchema = new EntitySchema({
  class: User,
  tableName: 'users',
  properties: {
    id: { type: 'number', primary: true },
    email: { type: 'string', unique: true },
    password: { type: 'string' },
    role: { type: 'string' },
    name: { type: 'string', nullable: true },
    created_at: { type: 'string', nullable: true },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
  },
});