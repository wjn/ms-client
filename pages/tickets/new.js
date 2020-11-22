import { useState } from 'react';
import PageContainer from '../../components/page-container';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { ErrorsNoFieldAssiged, ErrorsInputField } from '../../components/error-notices';

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
          <ErrorsInputField errors={errors} fieldName="title" />
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
          <ErrorsInputField errors={errors} fieldName="price" />
        </div>
        {/* Handle cases where there is an error but no field is assigned. 
            e.g., 'email already in use.
        */}
        <ErrorsNoFieldAssiged errors={errors} />
        <button className="btn btn-primary form-control">Submit</button>
      </form>
    </PageContainer>
  );
};

export default NewTicket;
