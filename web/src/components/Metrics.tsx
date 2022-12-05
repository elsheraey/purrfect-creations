import { Card, Col, ColGrid, Metric, Text, Title } from '@tremor/react';

export function Metrics({ metrics }: any) {
  return (
    <>
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
    </>
  );
}
