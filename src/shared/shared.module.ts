import { Global, Module } from '@nestjs/common';

const modules = [ ]

@Global()
@Module({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
