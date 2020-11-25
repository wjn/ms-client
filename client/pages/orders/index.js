import PageContainer from '../../components/page-container';

const OrderIndex = ({ orders }) => {
  return (
    <PageContainer pageName="My Orders">
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              {order.ticket.title}: {order.status}
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  console.log(data);

  return { orders: data };
};

export default OrderIndex;
