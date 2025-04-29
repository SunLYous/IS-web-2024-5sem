import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as crypto from 'crypto';
import { Response, Request } from 'express';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data: Record<string, any> | null) => {
        const bodyString = JSON.stringify(data);

        const etag = crypto.createHash('md5').update(bodyString).digest('hex');

        response.setHeader('ETag', etag);
        response.setHeader('Cache-Control', 'public, max-age=3600'); // 1 час

        const clientETag = request.headers['if-none-match'];
        if (clientETag && clientETag === etag) {
          response.status(304).send();
          return null;
        }

        return data;
      }),
    );
  }
}
