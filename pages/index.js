import buildClient from '../api/build-client';
import PageContainer from '../components/page-container';

const LandingPage = ({ appName, currentUser }) => {
  return <PageContainer pageName={`Welcome to ${appName}`} />;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
