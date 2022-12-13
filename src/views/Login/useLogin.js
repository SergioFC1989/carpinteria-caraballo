import { onAuthSignInWithEmail } from '../../api/auth/firebase-auth';
import useCommon from '../../common/hooks/useCommon';

const useLogin = () => {
  const { handleCommon, handleErrors, navigate } = useCommon();

  const schemaLogin = [
    { field: 'Correo electronico', key: 'email', type: 'email' },
    { field: 'Contraseña', key: 'password', type: 'password' },
  ];

  const onLoginWithEmail = async (value) => {
    try {
      handleCommon.show({ loading: true });
      await onAuthSignInWithEmail(value.email, value.password);
      handleCommon.show({ loading: false });
      navigate('/dashboard');
    } catch (error) {
      handleCommon.show({ loading: false });
      handleErrors(error);
    }
  };

  return { schemaLogin, onLoginWithEmail };
};

export default useLogin;
