import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';

export function RecentOrders({ metrics }: any) {
  return (
    <>
      <Title color="gray" marginTop="mt-6">
        Recent Orders
      </Title>

      <Table marginTop="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell>order_placed</TableHeaderCell>
            <TableHeaderCell>product_name</TableHeaderCell>
            <TableHeaderCell>price</TableHeaderCell>
            <TableHeaderCell>first_name</TableHeaderCell>
            <TableHeaderCell>last_name</TableHeaderCell>
            <TableHeaderCell>address</TableHeaderCell>
            <TableHeaderCell>email</TableHeaderCell>
            <TableHeaderCell>order_status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {metrics.recentOrders.map((order: any) => {
            return (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderPlaced}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{order.firstName}</TableCell>
                <TableCell>{order.lastName}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
