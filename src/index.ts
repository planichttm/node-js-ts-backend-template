import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clientInfoMiddleware } from './http/middleware/client-info.middleware';
import healthRoutes from './http/routes/health.routes';
import { logger } from './shared/utils/logging.utils';
import { getMemoryUsage } from './shared/utils/memory-management.utils';

// Lade Umgebungsvariablen
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS-Konfiguration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"], 
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware einrichten
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(clientInfoMiddleware);

// API-Routen
app.use('/api/health', healthRoutes);


// Server starten
app.listen(port, () => {
  logger.system(`Server running on port ${port}`, {
    context: 'Application',
    metadata: {
      port,
      memoryUsage: getMemoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Starting graceful shutdown...', {
    context: 'Application'
  });
  process.exit(0);
});

// Fehlerbehandlung für unbehandelte Ausnahmen
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    context: 'Application',
    error: error instanceof Error ? error.message : 'Unknown error'
  });
  process.exit(1);
});

export default app;