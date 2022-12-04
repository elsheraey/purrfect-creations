// NOTE: this is the first time I use tremor which I did for pure experimentation

// TODO: this could be dissected into multiple pieces but
//       I will keep it as such due to the time constraint

import {
  Card,
  Col,
  ColGrid,
  Divider,
  DonutChart,
  Metric,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from '@tremor/react';
import '@tremor/react/dist/esm/tremor.css';
import { useEffect, useState } from 'react';

function App() {
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    ordersThisMonth: 0,
    ordersInProgress: 0,
    revenue: 0,
    recentOrders: [],
    ordersByOrderStatus: [],
    ordersByProductName: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetch('http://localhost:3000/orders/metrics')
        .then(response => response.json())
        .then(json => {
          setMetrics(json);
          setLoading(false);
        });
    } catch (error) {
      setError(true);
    }
  }, []);

  return (
    <>
      {error && (
        <h1 style={{ marginLeft: '10px', color: 'red' }}>
          Error while fetching data! Please reload this dashboard.
        </h1>
      )}

      {loading ? (
        <h1 style={{ marginLeft: '10px', color: 'blue' }}>Loading...</h1>
      ) : (
        <Card>
          <div style={{ textAlign: 'center' }}>
            <Title>Purrfect Creations Dashboard</Title>
          </div>

          <Divider />

          <Title color="gray" marginTop="mt-0">
            Metrics
          </Title>

          <ColGrid numCols={2} gapX="gap-x-2" gapY="gap-y-2" marginTop="mt-4">
            <Col>
              <Card>
                <Text>Total Orders</Text>
                <Metric>{metrics.totalOrders}</Metric>
              </Card>
            </Col>

            <Col>
              <Card>
                <Text>Order This Month</Text>
                <Metric>{metrics.ordersThisMonth}</Metric>
              </Card>
            </Col>

            <Col>
              <Card>
                <Text>Orders In Progress</Text>
                <Metric>{metrics.ordersInProgress}</Metric>
              </Card>
            </Col>

            <Col>
              <Card>
                <Text>Revenue</Text>
                <Metric>{metrics.revenue}</Metric>
              </Card>
            </Col>
          </ColGrid>

          <Title color="gray" marginTop="mt-6">
            Graphs
          </Title>

          <ColGrid numCols={2} gapX="gap-x-2" gapY="gap-y-2" marginTop="mt-4">
            <Col>
              <Card>
                <Text>Orders by Order Status</Text>
                <DonutChart
                  data={Object.entries(metrics.ordersByOrderStatus).map(
                    entry => {
                      return {
                        orderStatus: entry[0],
                        orders: entry[1],
                      };
                    },
                  )}
                  category="orders"
                  dataKey="orderStatus"
                />
              </Card>
            </Col>

            <Col>
              <Card>
                <Text>Orders by Product Name</Text>
                <DonutChart
                  data={Object.entries(metrics.ordersByProductName).map(
                    entry => {
                      return {
                        productName: entry[0],
                        orders: entry[1],
                      };
                    },
                  )}
                  category="orders"
                  dataKey="productName"
                />
              </Card>
            </Col>
          </ColGrid>

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
        </Card>
      )}
    </>
  );
}

export default App;
