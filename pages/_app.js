import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import PageHeader from '../components/page-header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const appName = 'GimmeTix';
  return (
    <div>
      <PageHeader appName={appName} currentUser={currentUser} />
      <Component appName={appName} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  console.log(pageProps);

  return {
    pageProps,
    // destructures all the properties in `data`
    ...data,
  };
};

export default AppComponent;
