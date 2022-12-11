import {
  onAuthSignInWithEmail,
  onAuthSignInWithGoogle,
} from '../../api/auth/firebase-auth';
import useCommon from '../../common/hooks/useCommon';

const useLogin = () => {
  const { handleCommon, handleErrors } = useCommon();

  const schemaLogin = [
    { field: 'Usuario', key: 'usuario', type: 'email' },
    { field: 'Contraseña', key: 'pass', type: 'password' },
  ];

  const onLoginWithEmail = async (value) => {
    try {
      await onAuthSignInWithEmail(value.email, value.password);
    } catch (error) {
      handleCommon.show({ loading: false });
      handleErrors(error);
    }
  };

  const onLoginWithGoogle = async () => {
    try {
      await onAuthSignInWithGoogle();
    } catch (error) {
      handleCommon.show({ loading: false });
      handleErrors(error);
    }
  };

  return { schemaLogin, onLoginWithGoogle, onLoginWithEmail };
};

export default useLogin;
