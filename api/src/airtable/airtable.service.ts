// REFERENCE: https://airtable.com/app8wLQrrIMrnn673/api/docs#curl/table:orders:fields

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Airtable from 'airtable';
import { Cache } from 'cache-manager';
import { AIRTABLE_BASE_ID } from './constants/airtable-base-id.constant';
import { AIRTABLE_FIELD_IDS } from './constants/airtable-field-ids.constant';
import { AIRTABLE_TABLE_IDS } from './constants/airtable-table-ids.constant';
import { AIRTABLE_VIEWS } from './constants/airtable-views.constant';
import { Order } from './types/order.type';

@Injectable()
export class AirtableService {
  private base: Airtable.Base;

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    const apiKey = configService.get<string>('AIRTABLE_API_KEY');

    Airtable.configure({ apiKey: apiKey });

    this.base = Airtable.base(AIRTABLE_BASE_ID);
  }

  // TODO: might require pagination in a production setting to avoid huge responses
  async getOrders() {
    // TODO: get orders starting from the last date in cache to accomdate a real setting
    let orders: Order[] = await this.cacheManager.get('orders');
    if (orders) {
      return orders;
    }

    const records = await this.base(AIRTABLE_TABLE_IDS.orders)
      .select({
        view: AIRTABLE_VIEWS.grid,
        fields: [
          AIRTABLE_FIELD_IDS.orderId,
          AIRTABLE_FIELD_IDS.orderPlaced,
          AIRTABLE_FIELD_IDS.productName,
          AIRTABLE_FIELD_IDS.price,

          // REVIEW: sometimes the following fields are prohibited
          //         in dashboards for privacy reasons
          AIRTABLE_FIELD_IDS.firstName,
          AIRTABLE_FIELD_IDS.lastName,
          AIRTABLE_FIELD_IDS.address,
          AIRTABLE_FIELD_IDS.email,

          AIRTABLE_FIELD_IDS.orderStatus,
        ],
      })
      .all();

    orders = records.map(record => {
      return {
        orderId: record.fields.order_id as number,
        orderPlaced: record.fields.order_placed as string,
        productName: record.fields.product_name as string,
        price: record.fields.price as number,
        firstName: record.fields.first_name as string,
        lastName: record.fields.last_name as string,
        address: record.fields.address as string,
        email: record.fields.email as string,
        orderStatus: record.fields.order_status as string,
      };
    });

    await this.cacheManager.set('orders', orders);

    return orders;
  }

  // NOTE:  this was an initial solution that I removed in favor of reducing Airtable requests
  //        for in an actual setting, this might cost more...

  // async getRecentOrders(maxRecords: number = 10) {
  // return await this.base(AIRTABLE_TABLE_IDS.orders)
  //     .select({
  //       fields: [
  //         AIRTABLE_FIELD_IDS.orderId,
  //         AIRTABLE_FIELD_IDS.orderPlaced,
  //         AIRTABLE_FIELD_IDS.productName,
  //         AIRTABLE_FIELD_IDS.price,
  //
  //         AIRTABLE_FIELD_IDS.orderStatus,
  //       ],
  //       maxRecords,
  //       // TODO: guard for the constraint: "pageSize must be less than or equal to 100"
  //       pageSize: maxRecords,
  //       sort: [{ field: AIRTABLE_FIELD_IDS.orderPlaced, direction: 'desc' }],
  //       view: AIRTABLE_VIEWS.grid,
  //     })
  //     .all();
  // }
}
