import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    'SYSTEM_ADMIN',
    'BRANCH_MANAGER',
    'PROPERTY_SPECIALIST',
    'RECEPTIONIST',
    'OWNER',
    'CLIENT'
  ];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName }
    });
  }

  const branches = [
    { name: 'Male', city: 'Malé' },
    { name: 'Hulhumale', city: 'Hulhumalé' },
    { name: 'Villingili', city: 'Villingili' }
  ];

  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { name: branch.name },
      update: {},
      create: branch
    });
  }

  const branchMap = await prisma.branch.findMany();
  const adminRole = await prisma.role.findUnique({ where: { name: 'SYSTEM_ADMIN' } });
  const ownerRole = await prisma.role.findUnique({ where: { name: 'OWNER' } });
  const clientRole = await prisma.role.findUnique({ where: { name: 'CLIENT' } });

  const systemAdmin = await prisma.user.upsert({
    where: { email: 'admin@housing-4-raajje.test' },
    update: {},
    create: {
      email: 'admin@housing-4-raajje.test',
      firstName: 'Admin',
      lastName: 'System',
      roleId: adminRole?.id ?? undefined,
      branchId: branchMap[0]?.id,
      mfaEnabled: true,
      status: 'ACTIVE'
    }
  });

  await prisma.auditLog.create({
    data: {
      actorId: systemAdmin.id,
      action: 'seed_data_loaded',
      entity: 'system',
      entityId: 'seed',
      metadata: JSON.stringify({ message: 'Initial demo dataset loaded.' })
    }
  });

  const ownerUser = await prisma.user.upsert({
    where: { email: 'owner@housing-4-raajje.test' },
    update: {},
    create: {
      email: 'owner@housing-4-raajje.test',
      firstName: 'Aisha',
      lastName: 'Rahman',
      roleId: ownerRole?.id ?? undefined,
      status: 'ACTIVE'
    }
  });

  const clientUser = await prisma.user.upsert({
    where: { email: 'client@housing-4-raajje.test' },
    update: {},
    create: {
      email: 'client@housing-4-raajje.test',
      firstName: 'Nadim',
      lastName: 'Hassan',
      roleId: clientRole?.id ?? undefined,
      status: 'ACTIVE'
    }
  });

  await prisma.ownerProfile.upsert({
    where: { userId: ownerUser.id },
    update: {},
    create: {
      userId: ownerUser.id,
      nationalId: 'A-12345',
      bankName: 'Bank of Maldives',
      accountNumber: '000123456789',
      payoutMethod: 'Bank Transfer'
    }
  });

  await prisma.clientProfile.upsert({
    where: { userId: clientUser.id },
    update: {},
    create: {
      userId: clientUser.id,
      maxRent: 20000,
      preferredLocation: 'Male'
    }
  });

  const property = await prisma.property.upsert({
    where: { id: 'seed-property-1' },
    update: {},
    create: {
      id: 'seed-property-1',
      title: 'Ocean View Apartment',
      description: 'A bright two-bedroom apartment suitable for a family.',
      location: 'Male',
      roomCount: 2,
      monthlyRent: 18000,
      status: 'AVAILABLE',
      approvalStatus: 'APPROVED',
      isActive: true,
      ownerId: ownerUser.id,
      branchId: branchMap.find((branch) => branch.name === 'Male')?.id ?? branchMap[0].id
    }
  });

  await prisma.application.upsert({
    where: { id: 'seed-application-1' },
    update: {},
    create: {
      id: 'seed-application-1',
      userId: clientUser.id,
      propertyId: property.id,
      status: 'PENDING',
      notes: 'Interested in a two-bedroom unit in Malé.'
    }
  });

  await prisma.maintenanceRequest.upsert({
    where: { id: 'seed-maintenance-1' },
    update: {},
    create: {
      id: 'seed-maintenance-1',
      propertyId: property.id,
      clientId: clientUser.id,
      ownerId: ownerUser.id,
      issue: 'Water pressure issue in the kitchen sink.',
      priority: 'MEDIUM',
      status: 'OPEN'
    }
  });

  console.log('Seed data loaded');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
