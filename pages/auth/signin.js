import authForm from '../../components/auth-form';

const Signin = () => {
  const pageContents = authForm({
    pageName: 'Sign In',
    authPath: '/api/users/signin',
  });

  return pageContents;
};

export default Signin;
