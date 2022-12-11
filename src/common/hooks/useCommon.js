import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';

import errorsFirestoreAPI from '../../api/errors/firebase-errors';
import queryFirestoreAPI from '../../api/query/firebase-query';
import { auth } from '../../api/config/firebase-config';

import {
  stateAuth,
  stateAuthGetGoogle,
  stateIsShow,
  stateNotification,
} from '../context/common-context';

const useCommon = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useRecoilState(stateIsShow);
  const [notification, setNotification] = useRecoilState(stateNotification);
  const [authUser, setAuthUser] = useRecoilState(stateAuth);
  const [authGoogle, setAuthGoogle] = useRecoilState(stateAuthGetGoogle);

  const handleCommon = {
    show: (data = isShow) => setIsShow({ ...isShow, ...data }),
    notification: (title, message, status, visible = false) =>
      setNotification({ title, message, status, visible }),
  };

  const handleErrors = (value) => {
    const message =
      typeof value === 'object' ? value.message.toString() : value;
    handleCommon.notification(
      'Lo sentimos...',
      message.includes('Firebase: Error')
        ? errorsFirestoreAPI[value?.message]
        : value?.message,
      'critical',
      true
    );
  };

  useEffect(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        try {
          const usersFirestore = queryFirestoreAPI.get.user(
            'email',
            user?.email
          );
          if (usersFirestore.length <= 0) {
            const auth = {
              photoURL: user?.photoURL,
              displayName: user?.displayName,
              email: user?.email,
            };
            setAuthGoogle(auth);
            return (
              window.location.pathname !== '/profile' && navigate('/profile')
            );
          }
          setAuthUser(...usersFirestore);
          navigate('/dashboard');
        } catch (error) {
          handleErrors(error);
        }
      }
      return navigate('/login');
    });
  }, [authUser]);

  return {
    authUser,
    authGoogle,
    isShow,
    notification,
    navigate,
    handleCommon,
    handleErrors,
  };
};
export default useCommon;
