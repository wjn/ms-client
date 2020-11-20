import { useState } from 'react';
import PageContainer from '../../components/page-container';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = ({ appName, currentUser }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => {
      Router.push('/');
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };
  const formatPrice = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <PageContainer pageName={`Create a new Ticket`}>
      <form onSubmit={onSubmit}>
        {/* Title */}
        <div className="form-group">
          <label className="">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={'form-control' + (errors?.some((err) => err.field === 'title') ? ' is-invalid' : '')}
          />
          {/* Display title field errors */}
          {errors?.some((err) => err.field === 'title') && (
            <div className="invalid-feedback">
              {errors.map((err) => {
                if (err.field === 'title') {
                  return <div key={err.message}>{err.message}</div>;
                }
              })}
            </div>
          )}{' '}
        </div>
        {/* Price */}
        <div className="form-group">
          <label className="">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={formatPrice}
            className={'form-control' + (errors?.some((err) => err.field === 'price') ? ' is-invalid' : '')}
          />
          {/* Display price field errors */}
          {errors?.some((err) => err.field === 'price') && (
            <div className="invalid-feedback">
              {errors.map((err) => {
                if (err.field === 'price') {
                  return <div key={err.message}>{err.message}</div>;
                }
              })}
            </div>
          )}{' '}
        </div>
        {/* Handle cases where there is an error but no field is assigned. 
            e.g., 'email already in use.
        */}
        {errors?.some((err) => !err.field) && (
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            {errors.map((err) => {
              if (!err.field) {
                return <div key={err.message}>{err.message}</div>;
              }
            })}
          </div>
        )}{' '}
        <button className="btn btn-primary form-control">Submit</button>
      </form>
    </PageContainer>
  );
};

export default NewTicket;
