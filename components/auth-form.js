import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../hooks/use-request';
import PageContainer from '../components/page-container';

const AuthForm = ({ pageName, authPath }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // useRequest Hook
  const { doRequest, errors } = useRequest({
    url: authPath,
    method: 'post',
    body: {
      email,
      password,
    },
    // route user to homepage on successful signup
    onSuccess: () => {
      Router.push('/');
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <PageContainer pageName={pageName}>
      <form onSubmit={onSubmit}>
        <div className={'form-group'}>
          <div className="email-element">
            <label>Email Address</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={
                'form-control' +
                (errors?.some((err) => err.field === 'email')
                  ? ' is-invalid'
                  : '')
              }
            />
            {/* Display email field errors */}
            {errors?.some((err) => err.field === 'email') && (
              <div className="invalid-feedback">
                {errors.map((err) => {
                  if (err.field === 'email') {
                    return <div key={err.message}>{err.message}</div>;
                  }
                })}
              </div>
            )}{' '}
          </div>
          <br />
          <div className="password-element">
            <label>Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className={
                'form-control' +
                (errors?.some((err) => err.field === 'password')
                  ? ' is-invalid'
                  : '')
              }
            />
            {/* Display password field errors */}
            {errors?.some((err) => err.field === 'password') && (
              <div className="invalid-feedback">
                {errors.map((err) => {
                  if (err.field === 'password') {
                    return <div key={err.message}>{err.message}</div>;
                  }
                })}
              </div>
            )}{' '}
          </div>
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
        <div className="button-container">
          <button className="btn btn-primary">{pageName}</button>
        </div>
      </form>
    </PageContainer>
  );
};

export default AuthForm;
