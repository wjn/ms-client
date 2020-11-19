import PageContainer from '../components/page-container';

const LandingPage = ({ appName, currentUser }) => {
  return <PageContainer pageName={`Welcome to ${appName}`} />;
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
