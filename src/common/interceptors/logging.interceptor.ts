import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { AsyncLocalStorage } from 'async_hooks';

interface RequestContext {
    requestId: string;
    ip: string;
    method: string;
    path: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpCtx = context.switchToHttp();
        const request = httpCtx.getRequest<Request>();
        const response = httpCtx.getResponse<Response>();

        const { method, originalUrl, ip } = request;
        const requestId = uuidv4();

        const ctx: RequestContext = {
            requestId,
            ip,
            method,
            path: originalUrl,
        };

        return asyncLocalStorage.run(ctx, () => {
            return next.handle().pipe(
                finalize(() => {
                    response.setHeader('X-Request-Id', ctx.requestId);
                }),
            );
        });
    }
}