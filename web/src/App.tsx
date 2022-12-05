// NOTE: this is the first time I use tremor which I did for pure experimentation

// TODO: this could be dissected into multiple pieces but
//       I will keep it as such due to the time constraint

import { Card, Divider, Title } from '@tremor/react';
import '@tremor/react/dist/esm/tremor.css';
import { useEffect, useState } from 'react';
import { Error } from './components/Error';
import { Graphs } from './components/Graphs';
import { Loading } from './components/Loading';
import { Metrics } from './components/Metrics';
import { RecentOrders } from './components/RecentOrders';

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
      fetch(`${process.env.REACT_APP_API_URL}/orders/metrics`)
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
      {error && <Error />}

      {loading ? (
        <Loading />
      ) : (
        <Card>
          <div style={{ textAlign: 'center' }}>
            <Title>Purrfect Creations Dashboard</Title>
          </div>

          <Divider />

          <Metrics metrics={metrics} />
          <Graphs metrics={metrics} />
          <RecentOrders metrics={metrics} />
        </Card>
      )}
    </>
  );
}

export default App;
