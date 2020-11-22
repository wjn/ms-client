import PageContainer from '../../components/page-container';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { ErrorsNoFieldAssiged } from '../../components/error-notices';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <PageContainer pageName="Ticket Information">
      <h3>{ticket.title.toUpperCase()}</h3>
      <h4>Price: {ticket.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</h4>
      <ErrorsNoFieldAssiged errors={errors} />
      <button onClick={doRequest} className="btn btn-primary">
        Purchase
      </button>
    </PageContainer>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  /**
   * Whatever the file name is has to be used here for the query. In this
   * case, this file is named [ticketId].js so we destructure `ticketId`
   * from the context.query.
   */
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
