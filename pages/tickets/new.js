import { useState } from 'react';
import PageContainer from '../../components/page-container';

const NewTicket = ({ appName, currentUser }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const formatPrice = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <PageContainer pageName={`Create a new Ticket`}>
      <form>
        <div className="form-group">
          <label className="">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="">Price</label>
          <input
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={formatPrice}
          />
        </div>
        <button className="btn btn-primary form-control">Submit</button>
      </form>
    </PageContainer>
  );
};

export default NewTicket;
