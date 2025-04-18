import { Request, Response } from 'express';
import { ClientInfo } from '../types/client-info';

interface ResponseData {
  success?: boolean;
  data?: any;
  error?: string;
  timestamp: string;
  clientInfo?: ClientInfo;
}

export function getRequestMetadata(req: Request) {
  return {
    headers: req.headers,
    url: req.url,
    method: req.method,
    query: req.query,
    timestamp: new Date().toISOString()
  };
}

export function sendResponse(
  res: Response, 
  status: number, 
  data: any, 
  clientInfo?: ClientInfo
): void {
  const responseData: ResponseData = {
    success: status < 400,
    data: status < 400 ? data : undefined,
    error: status >= 400 ? data : undefined,
    timestamp: new Date().toISOString(),
    clientInfo
  };

  res.status(status).json(responseData);
}

export function sendSuccessResponse(
  res: Response, 
  data: any, 
  clientInfo?: ClientInfo
): void {
  sendResponse(res, 200, data, clientInfo);
}

export function sendErrorResponse(
  res: Response, 
  status: number, 
  error: string, 
  clientInfo?: ClientInfo
): void {
  sendResponse(res, status, error, clientInfo);
}