import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirtableModule } from './airtable/airtable.module';
import { AirtableService } from './airtable/airtable.service';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register(),
    AirtableModule,
    OrdersModule,
  ],
  providers: [AppService, AirtableService],
})
export class AppModule {}
