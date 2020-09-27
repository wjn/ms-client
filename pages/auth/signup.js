import authForm from '../../components/auth-form';

const Signup = () => {
  const pageContents = authForm({
    pageName: 'Sign Up',
    authPath: '/api/users/signup',
  });

  return pageContents;
};

export default Signup;
