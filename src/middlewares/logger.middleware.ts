import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    const now = new Date().toISOString();
    const { method, originalUrl } = req;
    const ip = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.getHeader('content-length') || '0';
      this.logger.log(
        `${now} ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    return next();
  }
}
