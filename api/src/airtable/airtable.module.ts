import { CacheModule, Module } from '@nestjs/common';
import { AirtableService } from './airtable.service';

@Module({
  imports: [CacheModule.register()],
  providers: [AirtableService],
})
export class AirtableModule {}
