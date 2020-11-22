import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageContainer from '../../components/page-container';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);

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
          This order has expired.{' '}
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
    return <>{out}</>;
  };

  return <PageContainer pageName="Order Information">{countDownMessage(timeLeft)}</PageContainer>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
