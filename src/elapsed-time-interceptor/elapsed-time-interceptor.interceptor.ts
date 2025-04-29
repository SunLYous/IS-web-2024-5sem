import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response, Request } from 'express';

@Injectable()
export class ElapsedTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data: Record<string, any> | null) => {
        const elapsedTime = Date.now() - now;
        console.log(`Request to ${request.url} took ${elapsedTime}ms`);

        const contentType = response.getHeader('content-type') as
          | string
          | undefined;

        if (contentType?.includes('text/html')) {
          if (typeof data === 'object' && data !== null) {
            return { ...data, elapsedTime };
          }
        } else {
          response.setHeader('X-Elapsed-Time', `${elapsedTime}ms`);
        }

        return data;
      }),
    );
  }
}
