import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now;
        console.log(
          `Request ${request.method} ${request.url} took ${elapsed}ms`,
        );

        if (request.headers['accept']?.includes('application/json')) {
          response.setHeader('X-Elapsed-Time', `${elapsed}ms`);
        }

        if (response.locals) {
          response.locals.elapsedTime = elapsed;
        }
      }),
    );
  }
}
