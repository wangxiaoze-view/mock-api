import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedOrigin = process.env.CORS_ORIGIN;
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin || '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization, Content-Length, X-Requested-With',
    );
    next();
  }
}
