import { Request, Response } from 'express';
import { ClientInfo } from '../../shared/types/client-info';
import { logger } from '../../shared/utils/logging.utils';
import { sendErrorResponse, sendSuccessResponse } from '../../shared/utils/http.utils';

export interface RequestWithUser extends Request {
  user?: any;
  clientInfo: ClientInfo;
}

export abstract class BaseController {
  protected async handleRequest(
    req: RequestWithUser,
    res: Response,
    handler: () => Promise<any>
  ): Promise<void> {
    try {
      const result = await handler();
      sendSuccessResponse(res, result, req.clientInfo);
    } catch (error) {
      logger.error('Controller error', {
        context: this.constructor.name,
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          path: req.path,
          method: req.method,
          query: req.query,
          params: req.params
        }
      });
      
      sendErrorResponse(
        res,
        500,
        error instanceof Error ? error.message : 'Unknown error',
        req.clientInfo
      );
    }
  }
}