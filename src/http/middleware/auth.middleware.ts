// src/http/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { appConfig } from '../../shared/config/app.config';
import { logger } from '../../shared/utils/logging.utils';

interface SupabaseJwtPayload extends JwtPayload {
  role?: string;
  iss?: string;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Skip validation if auth type is 'none'
  if (appConfig.auth.validationType === 'none') {
    (req as any).user = { role: 'anonymous' };
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Handle different auth types
    if (appConfig.auth.validationType === 'supabase') {
      const decoded = jwt.decode(token) as SupabaseJwtPayload;
      
      if (!decoded || 
          !decoded.sub || 
          !decoded.role || 
          !appConfig.auth.supabase?.url ||
          decoded.iss !== `${appConfig.auth.supabase.url}/auth/v1`) {
        throw new Error('Invalid token structure');
      }

      (req as any).user = decoded;
      next();
    } 
    else if (appConfig.auth.validationType === 'static') {
      // Simple static key validation
      if (token !== appConfig.auth.staticKey?.apiKey) {
        throw new Error('Invalid API key');
      }
      
      (req as any).user = { role: 'api', sub: 'static-api-user' };
      next();
    }
    else {
      throw new Error(`Unsupported auth validation type: ${appConfig.auth.validationType}`);
    }
  } catch (error) {
    logger.error('Authentication error', {
      context: 'AuthMiddleware',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return res.status(401).json({ 
      error: "Unauthorized: Invalid authentication",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}