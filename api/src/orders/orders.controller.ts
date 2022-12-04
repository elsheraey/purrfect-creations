import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  findAll() {
    return this.ordersService.findAll();
  }

  // NOTE: this could actually be separated into dashboard service if this was of a more complex nature,
  //       however, to keep things simple, I opt for just having it placed here.
  @Get('/metrics')
  getMetrics() {
    return this.ordersService.getMetrics();
  }
}
