import { Card, Col, ColGrid, DonutChart, Text, Title } from '@tremor/react';

export function Graphs({ metrics }: any) {
  return (
    <>
      <Title color="gray" marginTop="mt-6">
        Graphs
      </Title>

      <ColGrid numCols={2} gapX="gap-x-2" gapY="gap-y-2" marginTop="mt-4">
        <Col>
          <Card>
            <Text>Orders by Order Status</Text>
            <DonutChart
              data={Object.entries(metrics.ordersByOrderStatus).map(entry => {
                return {
                  orderStatus: entry[0],
                  orders: entry[1],
                };
              })}
              category="orders"
              dataKey="orderStatus"
            />
          </Card>
        </Col>

        <Col>
          <Card>
            <Text>Orders by Product Name</Text>
            <DonutChart
              data={Object.entries(metrics.ordersByProductName).map(entry => {
                return {
                  productName: entry[0],
                  orders: entry[1],
                };
              })}
              category="orders"
              dataKey="productName"
            />
          </Card>
        </Col>
      </ColGrid>
    </>
  );
}
