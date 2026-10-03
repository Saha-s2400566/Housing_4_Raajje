import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = Router();

router.get('/', async (_req, res) => {
  const properties = await prisma.property.findMany({
    include: {
      branch: true,
      owner: true,
      images: true,
      applications: true,
      leases: true
    }
  });

  res.json(properties);
});

router.get('/:id', async (req, res) => {
  const property = await prisma.property.findUnique({
    where: { id: req.params.id },
    include: {
      branch: true,
      owner: true,
      images: true,
      applications: true,
      leases: true
    }
  });

  if (!property) return res.status(404).json({ message: 'Property not found.' });
  res.json(property);
});

router.post('/', requireAuth, authorize('SYSTEM_ADMIN', 'BRANCH_MANAGER', 'PROPERTY_SPECIALIST', 'OWNER'), async (req, res) => {
  const body = req.body ?? {};
  const ownerId = body.ownerId ?? req.user?.id ?? 'demo-owner';

  const property = await prisma.property.create({
    data: {
      title: body.title ?? 'New apartment',
      description: body.description ?? 'Property awaiting review',
      location: body.location ?? 'Male',
      roomCount: Number(body.roomCount ?? 2),
      monthlyRent: Number(body.monthlyRent ?? 15000),
      status: 'PENDING_APPROVAL',
      approvalStatus: 'PENDING',
      isActive: true,
      owner: {
        connect: { id: ownerId }
      },
      branch: {
        connectOrCreate: {
          where: { name: body.branch ?? 'Male' },
          create: { name: body.branch ?? 'Male', city: 'Malé' }
        }
      }
    }
  });

  res.status(201).json(property);
});

export default router;
