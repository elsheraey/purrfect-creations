import { Injectable } from '@nestjs/common';
import { AirtableService } from './airtable/airtable.service';

@Injectable()
export class AppService {
  constructor(private airtableService: AirtableService) {}

  getHello() {
    return this.airtableService.getOrders();
  }
}
