import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import applicationRoutes from './routes/applications.js';
import viewingRoutes from './routes/viewings.js';
import leaseRoutes from './routes/leases.js';
import paymentRoutes from './routes/payments.js';
import maintenanceRoutes from './routes/maintenance.js';
import adminRoutes from './routes/admin.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Housing_4_Raajje', environment: env.nodeEnv });
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/viewings', viewingRoutes);
app.use('/api/leases', leaseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/admin', adminRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error.' });
});

app.listen(env.port, () => {
  console.log(`Housing_4_Raajje API listening on http://localhost:${env.port}`);
});
