import { Request as ExpressRequest, Response, NextFunction } from 'express-serve-static-core';
import { ClientInfo } from '../../shared/types/client-info';

export const clientInfoMiddleware = (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const clientInfo: ClientInfo = {
    clientIP: req.ip || 'unknown',
    forwardedIP: req.headers['x-forwarded-for']?.toString() || undefined,
    realIP: req.headers['x-real-ip']?.toString() || undefined,
    userAgent: req.headers['user-agent'] || undefined,
    requestInfo: {
      method: req.method || 'unknown',
      path: req.path || 'unknown',
      protocol: req.protocol || 'unknown',
      hostname: req.hostname || 'unknown',
      timestamp: new Date().toISOString()
    }
  };

  (req as any).clientInfo = clientInfo;
  next();
};