import PageContainer from '../components/page-container';
import Link from 'next/link';

const LandingPage = ({ appName, currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a className="ticket-link">{ticket.title}</a>
          </Link>
        </td>
        <td>{ticket.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</td>
      </tr>
    );
  });

  return (
    <PageContainer pageName={`Available Tickets`}>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </PageContainer>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
