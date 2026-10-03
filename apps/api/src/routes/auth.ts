import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, (req, res) => {
  res.json({
    user: req.user,
    message: 'Authenticated session is active.'
  });
});

router.post('/demo-login', (req, res) => {
  const role = String(req.body?.role ?? 'CLIENT');
  const branch = String(req.body?.branch ?? 'Male');
  const user = {
    id: `user-${Date.now()}`,
    email: `demo-${role.toLowerCase()}@housing-rs.test`,
    role,
    branchId: branch
  };

  res.json({ user, note: 'This demo login is intended for local development only.' });
});

export default router;
