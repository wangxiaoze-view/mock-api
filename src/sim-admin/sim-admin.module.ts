import { Module } from '@nestjs/common';
import { SimAdminService } from './sim-admin.service';
import { SimAdminController } from './sim-admin.controller';

@Module({
  controllers: [SimAdminController],
  providers: [SimAdminService],
})
export class SimAdminModule {}
