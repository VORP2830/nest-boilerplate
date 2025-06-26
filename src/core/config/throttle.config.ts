import { registerAs } from '@nestjs/config';

export default registerAs('throttle', () => ({
    throttlers: [
        {
            ttl: 1000,
            limit: 5,
        },
    ],
}));