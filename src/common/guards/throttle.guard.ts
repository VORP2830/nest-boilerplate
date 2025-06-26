import { HttpException, HttpStatus, Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    protected async throwThrottlingException(
        context: ExecutionContext,
        throttlerLimitDetail: ThrottlerLimitDetail
    ): Promise<void> {
        throw new HttpException(
            "Você atingiu o limite de tentativas. Tente novamente mais tarde.", 
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}