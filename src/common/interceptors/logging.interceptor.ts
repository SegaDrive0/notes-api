import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        const status = response.statusCode;
        const delay = Date.now() - now;

        this.logger.log(
          `${request.method} ${request.url} ${status} +${delay}ms`,
        );
      }),
      catchError((error) => {
        const status = error.status || 500;
        const delay = Date.now() - now;

        if (status >= 500) {
          this.logger.error(
            `${request.method} ${request.url} ${status} +${delay}ms`,
          );
        } else {
          this.logger.warn(
            `${request.method} ${request.url} ${status} +${delay}ms`,
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
