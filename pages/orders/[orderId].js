import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageContainer from '../../components/page-container';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import { ErrorsNoFieldAssiged } from '../../components/error-notices';
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const ms = new Date(order.expiresAt) - new Date();

      setTimeLeft(ms);
    };

    findTimeLeft();
    // interval returns an int as timerId
    const timerId = setInterval(findTimeLeft, 1000);

    // return a function from useEffect, which is invoked when a user
    // navigates away from the page.
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const countDownMessage = (ms) => {
    // 10,433 ms = 10 seconds 433 ms
    // 62,324 ms = 1m 2s 324ms
    const msPerMinute = 60000;
    const msRemainder = ms % msPerMinute;
    let minutes = Math.floor(ms / msPerMinute);
    // fetch the remainder after minutes in seconds
    let seconds = Math.round(msRemainder / 1000);

    if (seconds === 60) {
      minutes++;
      seconds = seconds - 60;
    }

    const minutesGrammar = minutes === 1 ? 'minute' : 'minutes';
    const secondsGrammar = seconds === 1 ? 'second' : 'seconds';

    // if out of time, display expiration notice
    if (ms <= 0) {
      return (
        <>
          This order has expired.&nbsp;
          <Link href="/">
            <a className="link">Return to Ticket List.</a>
          </Link>
        </>
      );
    }
    let out = `Time left to purchase this ticket: `;
    // don't display minutes of there are only seconds remaining.
    if (minutes > 0) {
      out += `${minutes} ${minutesGrammar} `;
    }

    out += `${seconds} ${secondsGrammar}`;

    // return minutes and seconds information if duration is > 1m
    return (
      <>
        {out}
        <br />
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51Hn2IsG1LZGfSbsjzqcs3mLxWiU6D0pR61IPAs0JlR2vz6fRPnmtrMbTnBPM3taTUthCESVGKgHoJidZklXoz2vn00MPY6rTnY"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      </>
    );
  };

  // TODO: extract stripe public key to K8s secret -- check Next.js docs for how it handles ENV vars.
  return (
    <PageContainer pageName="Order Information">
      <div className="row">
        <div className="col-xs">{countDownMessage(timeLeft)}</div>
        <ErrorsNoFieldAssiged errors={errors} />
      </div>
    </PageContainer>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
