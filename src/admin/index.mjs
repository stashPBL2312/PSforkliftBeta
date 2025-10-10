// ESM-only AdminJS setup module
import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mikroorm';
import { initOrm, Forklift } from './orm.mjs';

export async function setupAdmin() {
  // Registrasi adapter MikroORM untuk AdminJS
  AdminJS.registerAdapter({ Database, Resource });
  const orm = await initOrm();

  const admin = new AdminJS({
    rootPath: '/admin',
    branding: { companyName: 'PSforklift' },
    resources: [
      {
        resource: { model: Forklift, orm },
        options: {
          navigation: 'Data',
          actions: {
            new: { isAccessible: false, isVisible: false },
            edit: { isAccessible: false, isVisible: false },
            delete: { isAccessible: false, isVisible: false },
            bulkDelete: { isAccessible: false, isVisible: false },
          },
        },
      },
    ],
  });
  const router = AdminJSExpress.buildRouter
    ? AdminJSExpress.buildRouter(admin)
    : AdminJSExpress.default.buildRouter(admin);
  return { admin, router };
}