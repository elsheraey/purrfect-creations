import { CacheModule, Module } from '@nestjs/common';
import { AirtableService } from '../airtable/airtable.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [OrdersController],
  providers: [OrdersService, AirtableService],
})
export class OrdersModule {}
