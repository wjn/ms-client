import { useEffect } from 'react';
import Router from 'next/router';
import PageContainer from '../../components/page-container';
import useRequest from '../../hooks/use-request';

const SignOut = () => {
  // useRequest Hook
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    // route user to homepage on successful signup
    onSuccess: () => {
      Router.push('/');
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <PageContainer pageName="Sign Out">Signing you out... </PageContainer>;
};

export default SignOut;
