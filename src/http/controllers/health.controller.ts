import { Request, Response } from 'express';
import { BaseController, RequestWithUser } from './base.controller';
import { getMemoryUsage } from '../../shared/utils/memory-management.utils';
import { version } from '../../version';

export class HealthController extends BaseController {
  async getHealth(req: RequestWithUser, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      return {
        status: 'OK',
        version,
        timestamp: new Date().toISOString(),
        memoryUsage: getMemoryUsage(),
        environment: process.env.NODE_ENV || 'development'
      };
    });
  }
}

export const healthController = new HealthController();