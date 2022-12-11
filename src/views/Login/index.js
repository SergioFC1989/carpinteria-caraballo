import Form from '../../common/components/Form';
import useLogin from './useLogin';

const Login = () => {
  const { schemaLogin } = useLogin();
  return <Form schema={schemaLogin} onSubmit={() => console.log('hola')} />;
};

export default Login;
