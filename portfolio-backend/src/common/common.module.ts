import { Global, Module } from '@nestjs/common';

// PubSub is not sync another server
// if you want sync, then use "RedisPubsub"

@Global()
@Module({
})
export class CommonModule {}
