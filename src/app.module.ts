import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { FeatureModule } from './features/feature.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    FeatureModule,
  ]
})
export class AppModule { }
