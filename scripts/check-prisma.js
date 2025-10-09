require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  try {
    const [users, forklifts, items, jobs, records] = await Promise.all([
      prisma.user.count(),
      prisma.forklift.count(),
      prisma.item.count(),
      prisma.job.count(),
      prisma.record.count(),
    ]);
    const [usersActive, forkliftsActive, itemsActive, jobsActive, recordsActive] = await Promise.all([
      prisma.user.count({ where: { deleted_at: null } }),
      prisma.forklift.count({ where: { deleted_at: null } }),
      prisma.item.count({ where: { deleted_at: null } }),
      prisma.job.count({ where: { deleted_at: null } }),
      prisma.record.count({ where: { deleted_at: null } }),
    ]);
    console.log('Prisma counts -> total users:', users, 'active users:', usersActive);
    console.log('Prisma counts -> total forklifts:', forklifts, 'active forklifts:', forkliftsActive);
    console.log('Prisma counts -> total items:', items, 'active items:', itemsActive);
    console.log('Prisma counts -> total jobs:', jobs, 'active jobs:', jobsActive);
    console.log('Prisma counts -> total records:', records, 'active records:', recordsActive);

    // Sample records to inspect field values
    const sample = await prisma.record.findMany({
      where: {},
      take: 5,
      orderBy: { id: 'desc' },
      select: { id: true, tanggal: true, pekerjaan: true, report_no: true, forklift_id: true, deleted_at: true }
    });
    console.log('Sample records:', sample);
  } catch (e) {
    console.error('Prisma error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();