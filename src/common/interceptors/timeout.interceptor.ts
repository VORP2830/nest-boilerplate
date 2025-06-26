import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException, Logger } from '@nestjs/common';
import { Observable, timeout, catchError, throwError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly TIMEOUT_MS = 10_000;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.TIMEOUT_MS),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          Logger.warn(`A requisição excedeu o tempo limite de ${this.TIMEOUT_MS / 1000} segundos.`);
          return throwError(() =>
            new RequestTimeoutException(`A requisição excedeu o tempo limite de ${this.TIMEOUT_MS / 1000} segundos.`),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
