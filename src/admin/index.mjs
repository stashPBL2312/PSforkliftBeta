// ESM-only AdminJS setup module
import AdminJS, { ComponentLoader } from 'adminjs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mikroorm';
import { initOrm, Forklift, User, Item, Job, Record, ArchiveJob } from './orm.mjs';

export async function setupAdmin() {
  // Registrasi adapter MikroORM untuk AdminJS
  AdminJS.registerAdapter({ Database, Resource });
  const orm = await initOrm();
  const conn = orm.em.getConnection();
  const wibNow = "datetime('now','+7 hours')";
  // Gunakan ComponentLoader untuk mendaftarkan komponen frontend aksi
  const componentLoader = new ComponentLoader();
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const Components = {
    // Ganti ID untuk bust cache bundler
    ActionNotice: componentLoader.add('ActionNotice', join(__dirname, 'components', 'ActionDone.jsx')),
  };

  const admin = new AdminJS({
    rootPath: '/admin',
    componentLoader,
    branding: { companyName: 'PSforklift' },
    resources: [
      {
        resource: { model: Forklift, orm },
        options: {
          navigation: 'Data',
          titleProperty: 'eq_no',
          listProperties: ['eq_no','brand','type','powertrain','location','status','tahun','created_at','updated_at','deleted_at'],
          showProperties: ['id','eq_no','brand','type','powertrain','owner','location','status','tahun','serial','created_at','updated_at','deleted_at'],
          sort: { direction: 'asc', sortBy: 'eq_no' },
          actions: {
            list: {},
            new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            delete: { isAccessible: () => false, isVisible: false },
            bulkDelete: { isAccessible: () => false, isVisible: false },
            softDelete: {
              actionType: 'record', icon: 'Trash', label: 'Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (req, res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE forklifts SET deleted_at = "+wibNow+" WHERE id=?", [id]);
                await conn.execute("UPDATE jobs SET deleted_at = "+wibNow+" WHERE forklift_id=?", [id]);
                await conn.execute("UPDATE records SET deleted_at = "+wibNow+" WHERE forklift_id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Forklift soft-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            recover: {
              actionType: 'record', icon: 'Undo', label: 'Recover',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (req, res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE forklifts SET deleted_at = NULL, updated_at = "+wibNow+" WHERE id=?", [id]);
                await conn.execute("UPDATE jobs SET deleted_at = NULL, updated_at = "+wibNow+" WHERE forklift_id=?", [id]);
                await conn.execute("UPDATE records SET deleted_at = NULL, updated_at = "+wibNow+" WHERE forklift_id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Forklift recovered', type: 'success' },
                  redirectUrl,
                };
              },
            },
            hardDelete: {
              actionType: 'record', icon: 'Close', label: 'Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (req, res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute('DELETE FROM records WHERE forklift_id=?', [id]);
                await conn.execute('DELETE FROM jobs WHERE forklift_id=?', [id]);
                await conn.execute('DELETE FROM forklifts WHERE id=?', [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Forklift hard-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkSoftDelete: {
              actionType: 'bulk', icon: 'Trash', label: 'Bulk Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`UPDATE forklifts SET deleted_at = ${wibNow} WHERE id IN (${placeholders})`, ids);
                await conn.execute(`UPDATE jobs SET deleted_at = ${wibNow} WHERE forklift_id IN (${placeholders})`, ids);
                await conn.execute(`UPDATE records SET deleted_at = ${wibNow} WHERE forklift_id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Soft delete ${ids.length} forklift`, type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkHardDelete: {
              actionType: 'bulk', icon: 'Close', label: 'Bulk Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`DELETE FROM records WHERE forklift_id IN (${placeholders})`, ids);
                await conn.execute(`DELETE FROM jobs WHERE forklift_id IN (${placeholders})`, ids);
                await conn.execute(`DELETE FROM forklifts WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Hard delete ${ids.length} forklift`, type: 'success' },
                  redirectUrl,
                };
              },
            },
          },
        },
      },
      {
        resource: { model: User, orm },
        options: {
          navigation: 'Data',
          properties: { password: { isVisible: false } },
          listProperties: ['email','name','role','created_at','updated_at','deleted_at'],
          showProperties: ['id','email','name','role','created_at','updated_at','deleted_at'],
          sort: { direction: 'desc', sortBy: 'id' },
          actions: {
            list: {},
            new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            delete: { isAccessible: () => false, isVisible: false },
            bulkDelete: { isAccessible: () => false, isVisible: false },
            softDelete: {
              actionType: 'record', icon: 'Trash', label: 'Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE users SET deleted_at = "+wibNow+" WHERE id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'User soft-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            recover: {
              actionType: 'record', icon: 'Undo', label: 'Recover',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE users SET deleted_at = NULL, updated_at = "+wibNow+" WHERE id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'User recovered', type: 'success' },
                  redirectUrl,
                };
              },
            },
            hardDelete: {
              actionType: 'record', icon: 'Close', label: 'Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute('DELETE FROM users WHERE id=?', [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'User hard-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkSoftDelete: {
              actionType: 'bulk', icon: 'Trash', label: 'Bulk Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`UPDATE users SET deleted_at = ${wibNow} WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Soft delete ${ids.length} user`, type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkHardDelete: {
              actionType: 'bulk', icon: 'Close', label: 'Bulk Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`DELETE FROM users WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Hard delete ${ids.length} user`, type: 'success' },
                  redirectUrl,
                };
              },
            },
          },
        },
      },
      {
        resource: { model: Item, orm },
        options: {
          navigation: 'Data',
          titleProperty: 'code',
          listProperties: ['code','nama','unit','status','created_at','updated_at','deleted_at'],
          showProperties: ['id','code','nama','unit','status','description','created_at','updated_at','deleted_at'],
          sort: { direction: 'asc', sortBy: 'code' },
          actions: {
            list: {},
            new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            delete: { isAccessible: () => false, isVisible: false },
            bulkDelete: { isAccessible: () => false, isVisible: false },
            softDelete: {
              actionType: 'record', icon: 'Trash', label: 'Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE items SET deleted_at = "+wibNow+" WHERE id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Item soft-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            recover: {
              actionType: 'record', icon: 'Undo', label: 'Recover',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE items SET deleted_at = NULL, updated_at = "+wibNow+" WHERE id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Item recovered', type: 'success' },
                  redirectUrl,
                };
              },
            },
            hardDelete: {
              actionType: 'record', icon: 'Close', label: 'Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute('DELETE FROM items WHERE id=?', [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Item hard-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkSoftDelete: {
              actionType: 'bulk', icon: 'Trash', label: 'Bulk Soft Delete',
              
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`UPDATE items SET deleted_at = ${wibNow} WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Soft delete ${ids.length} item`, type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkHardDelete: {
              actionType: 'bulk', icon: 'Close', label: 'Bulk Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`DELETE FROM items WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Hard delete ${ids.length} item`, type: 'success' },
                  redirectUrl,
                };
              },
            },
          },
        },
      },
      {
        resource: { model: Job, orm },
        options: {
          navigation: 'Data',
          listProperties: ['jenis','forklift_id','tanggal','teknisi','report_no','next_pm','created_at','updated_at','deleted_at'],
          showProperties: ['id','jenis','forklift_id','tanggal','teknisi','report_no','description','recommendation','items_used','next_pm','created_at','updated_at','deleted_at'],
          sort: { direction: 'desc', sortBy: 'tanggal' },
          actions: {
            list: {},
            new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            delete: { isAccessible: () => false, isVisible: false },
            bulkDelete: { isAccessible: () => false, isVisible: false },
            softDelete: {
              actionType: 'record', icon: 'Trash', label: 'Soft Delete',
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                const job = await conn.execute('SELECT report_no, forklift_id FROM jobs WHERE id=?', [id]);
                await conn.execute("UPDATE jobs SET deleted_at = "+wibNow+" WHERE id=?", [id]);
                if (job && job[0] && job[0].report_no) {
                  await conn.execute("UPDATE records SET deleted_at = "+wibNow+" WHERE report_no=? AND forklift_id=?", [job[0].report_no, job[0].forklift_id]);
                }
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Job soft-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            recover: {
              actionType: 'record', icon: 'Undo', label: 'Recover',
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                const job = await conn.execute('SELECT report_no, forklift_id FROM jobs WHERE id=?', [id]);
                await conn.execute("UPDATE jobs SET deleted_at = NULL, updated_at = "+wibNow+" WHERE id=?", [id]);
                if (job && job[0] && job[0].report_no) {
                  await conn.execute("UPDATE records SET deleted_at = NULL, updated_at = "+wibNow+" WHERE report_no=? AND forklift_id=?", [job[0].report_no, job[0].forklift_id]);
                }
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Job recovered', type: 'success' },
                  redirectUrl,
                };
              },
            },
            hardDelete: {
              actionType: 'record', icon: 'Close', label: 'Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                const job = await conn.execute('SELECT report_no, forklift_id FROM jobs WHERE id=?', [id]);
                if (job && job[0] && job[0].report_no) {
                  await conn.execute('DELETE FROM records WHERE report_no=? AND forklift_id=?', [job[0].report_no, job[0].forklift_id]);
                }
                await conn.execute('DELETE FROM jobs WHERE id=?', [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Job hard-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkSoftDelete: {
              actionType: 'bulk', icon: 'Trash', label: 'Bulk Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                const rows = await conn.execute(`SELECT report_no, forklift_id FROM jobs WHERE id IN (${placeholders})`, ids);
                await conn.execute(`UPDATE jobs SET deleted_at = ${wibNow} WHERE id IN (${placeholders})`, ids);
                if (rows && rows.length) {
                  for (const row of rows) {
                    if (row.report_no) {
                      await conn.execute(`UPDATE records SET deleted_at = ${wibNow} WHERE report_no=? AND forklift_id=?`, [row.report_no, row.forklift_id]);
                    }
                  }
                }
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Soft delete ${ids.length} job`, type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkHardDelete: {
              actionType: 'bulk', icon: 'Close', label: 'Bulk Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                const rows = await conn.execute(`SELECT report_no, forklift_id FROM jobs WHERE id IN (${placeholders})`, ids);
                if (rows && rows.length) {
                  for (const row of rows) {
                    if (row.report_no) {
                      await conn.execute('DELETE FROM records WHERE report_no=? AND forklift_id=?', [row.report_no, row.forklift_id]);
                    }
                  }
                }
                await conn.execute(`DELETE FROM jobs WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Hard delete ${ids.length} job`, type: 'success' },
                  redirectUrl,
                };
              },
            },
          },
        },
      },
      {
        resource: { model: Record, orm },
        options: {
          navigation: 'Data',
          listProperties: ['tanggal','forklift_id','pekerjaan','teknisi','location','report_no','created_at','updated_at','deleted_at'],
          showProperties: ['id','tanggal','forklift_id','pekerjaan','teknisi','location','report_no','description','recommendation','items_used','created_at','updated_at','deleted_at'],
          sort: { direction: 'desc', sortBy: 'tanggal' },
          actions: {
            list: {},
            new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            delete: { isAccessible: () => false, isVisible: false },
            bulkDelete: { isAccessible: () => false, isVisible: false },
            softDelete: {
              actionType: 'record', icon: 'Trash', label: 'Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE records SET deleted_at = "+wibNow+" WHERE id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Record soft-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            recover: {
              actionType: 'record', icon: 'Undo', label: 'Recover',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute("UPDATE records SET deleted_at = NULL, updated_at = "+wibNow+" WHERE id=?", [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Record recovered', type: 'success' },
                  redirectUrl,
                };
              },
            },
            hardDelete: {
              actionType: 'record', icon: 'Close', label: 'Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const id = context?.record?.params?.id;
                await conn.execute('DELETE FROM records WHERE id=?', [id]);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  record: context.record?.toJSON(context.currentAdmin),
                  notice: { message: 'Record hard-deleted', type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkSoftDelete: {
              actionType: 'bulk', icon: 'Trash', label: 'Bulk Soft Delete',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`UPDATE records SET deleted_at = ${wibNow} WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Soft delete ${ids.length} record`, type: 'success' },
                  redirectUrl,
                };
              },
            },
            bulkHardDelete: {
              actionType: 'bulk', icon: 'Close', label: 'Bulk Hard Delete', guard: 'Hapus permanen? Ini tidak bisa di-undo.',
              component: Components.ActionNotice,
              isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
              handler: async (_req, _res, context) => {
                const ids = (context?.records || []).map(r => r?.params?.id).filter(Boolean);
                if (!ids.length) return { notice: { message: 'Tidak ada record dipilih', type: 'info' } };
                const placeholders = ids.map(() => '?').join(',');
                await conn.execute(`DELETE FROM records WHERE id IN (${placeholders})`, ids);
                const redirectUrl = `${admin.options.rootPath}/resources/${context.resource.id()}`;
                return {
                  records: (context.records || []).map(r => r?.toJSON(context.currentAdmin)),
                  notice: { message: `Hard delete ${ids.length} record`, type: 'success' },
                  redirectUrl,
                };
              },
            },
          },
        },
      },
      {
        resource: { model: ArchiveJob, orm },
        options: {
          navigation: 'Archive',
          titleProperty: 'job_no',
          listProperties: ['job_no','job_date','job_source','forklift_id','forklift_eq_no','forklift_serial','status','created_at','updated_at'],
          showProperties: ['id','job_no','job_date','job_source','forklift_id','forklift_eq_no','forklift_serial','status','description','notes','created_at','updated_at'],
          sort: { direction: 'desc', sortBy: 'job_date' },
          actions: {
            list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            show: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            new: { isAccessible: () => false, isVisible: false },
            edit: { isAccessible: () => false, isVisible: false },
            delete: { isAccessible: () => false, isVisible: false },
            bulkDelete: { isAccessible: () => false, isVisible: false },
          },
        },
      },
    ],
  });
  const router = AdminJSExpress.buildRouter
    ? AdminJSExpress.buildRouter(admin)
    : AdminJSExpress.default.buildRouter(admin);
  // Map session user dari aplikasi ke session AdminJS agar currentAdmin tersedia
  router.use((req, _res, next) => {
    if (req.session && req.session.user) {
      const u = req.session.user;
      req.session.adminUser = { id: u.id, email: u.email, role: u.role, name: u.name || null };
    }
    next();
  });
  return { admin, router };
}