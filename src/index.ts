// src/index.ts
import express from 'express';
import cors from 'cors';
import { clientInfoMiddleware } from './http/middleware/client-info.middleware';
import healthRoutes from './http/routes/health.routes';
import { logger } from './shared/utils/logging.utils';
import { getMemoryUsage } from './shared/utils/memory-management.utils';
import { appConfig } from './shared/config/app.config';
import { validateAuthCredentials } from './shared/utils/validation.utils';

const app = express();
const port = appConfig.server.port;

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"], 
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(clientInfoMiddleware);

// API routes
app.use('/api/health', healthRoutes);

// Validate authentication configuration
if (appConfig.auth.validationType !== 'none') {
  const isAuthValid = validateAuthCredentials();
  if (!isAuthValid) {
    logger.warn(`Authentication validation type '${appConfig.auth.validationType}' is configured but credentials are missing or invalid. Some features may not work properly.`, {
      context: 'Application'
    });
  }
}

// Start server
app.listen(port, () => {
  logger.system(`Server running on port ${port}`, {
    context: 'Application',
    metadata: {
      port,
      memoryUsage: getMemoryUsage(),
      environment: appConfig.server.environment,
      authType: appConfig.auth.validationType
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

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    context: 'Application',
    error: error instanceof Error ? error.message : 'Unknown error'
  });
  process.exit(1);
});

export default app;