import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';

import errorsFirestoreAPI from '../../api/errors/firebase-errors';
import { auth } from '../../api/config/firebase-config';

import {
  stateHeaderDefault,
  stateIsShow,
  stateNotification,
} from '../context/common-context';
import queryFirestoreAPI from '../../api/query/firebase-query';

const useCommon = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useRecoilState(stateIsShow);
  const [notification, setNotification] = useRecoilState(stateNotification);
  const [optionsHeader, setOptionsHeader] = useRecoilState(stateHeaderDefault);
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

  const fetchDatum = () =>
    queryFirestoreAPI.GET.DOCUMENTS(optionsHeader.title.toLocaleLowerCase());

  const fetchClients = () => queryFirestoreAPI.GET.DOCUMENTS('clients');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => user === null && navigate('/login'));
  }, [auth]);

  return {
    isShow,
    notification,
    navigate,
    handleCommon,
    handleErrors,
    fetchDatum,
    fetchClients,
    optionsHeader,
    setOptionsHeader,
  };
};
export default useCommon;
