import { Router } from 'express';
import { healthController } from '../controllers/health.controller';

const router = Router();

router.get('/ping', (req, res) => {
  res.json({
    status: 'OK',
    memoryUsage: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

router.get('/status', (req: any, res) => 
  healthController.getHealth(req, res)
);

export default router;