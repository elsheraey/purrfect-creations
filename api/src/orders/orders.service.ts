import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import { AirtableService } from '../airtable/airtable.service';
import { ORDER_STATUS } from '../airtable/constants/order-status.constant';

dayjs.extend(isBetween);

@Injectable()
export class OrdersService {
  constructor(private readonly airtableService: AirtableService) {}

  async findAll() {
    try {
      return await this.airtableService.getOrders();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMetrics() {
    const orders = await this.findAll();
    return {
      totalOrders: orders.length,
      ordersThisMonth: orders.filter(order =>
        dayjs(order.orderPlaced as string).isBetween(
          dayjs().startOf('month'),
          dayjs().endOf('month'),
        ),
      ).length,
      ordersInProgress: orders.filter(
        order => order.orderStatus === ORDER_STATUS.inProgress,
      ).length,
      // REVIEW: this assumes that all cancelled orders refund 100% of its price
      revenue: parseFloat(
        orders
          .filter(order => order.orderStatus != ORDER_STATUS.cancelled)
          .reduce((sum, order) => sum + order.price, 0)
          // REVIEW: what precision is required?
          .toFixed(2),
      ),
      recentOrders: orders
        .sort((lhs, rhs) => dayjs(rhs.orderPlaced).diff(dayjs(lhs.orderPlaced)))
        .slice(0, 10),
    };
  }
}
