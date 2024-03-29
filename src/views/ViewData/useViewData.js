/* eslint-disable import/no-cycle */
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import queryFirestoreAPI from '../../api/query/firebase-query';
import { stateItemTable } from '../../common/context/common-context';
import useCommon from '../../common/hooks/useCommon';
import useForm from '../Form/useForm';

const useViewData = () => {
  const { optionsHeader, handleCommon, navigate } = useCommon();
  const {
    datum,
    setDatum,
    isFormDocument,
    calculateTotal,
    lastRef,
  } = useForm();
  const [itemDocumentForm, setItemDocumentForm] = useRecoilState(
    stateItemTable
  );

  const deleteItem = async () => {
    try {
      handleCommon.show({ loading: true });
      await queryFirestoreAPI.DELETE.DOCUMENT(
        optionsHeader.title.toLocaleLowerCase(),
        itemDocumentForm.idFirestore
      );
      const filteredData = datum.filter(
        (elem) => elem.idFirestore !== itemDocumentForm.idFirestore
      );
      setDatum(filteredData);
      lastRef(filteredData);
      handleCommon.show({ loading: false, question: false });
      handleCommon.notification(
        'Enhorabuena',
        'Registro eliminado correctamente',
        'normal',
        true
      );
    } catch (error) {
      handleCommon.show({ loading: false });
      handleCommon.notification(
        'Ha ocurrido un error',
        error,
        'critical',
        true
      );
    }
    return true;
  };

  useEffect(() => {
    calculateTotal(datum);
  }, [datum]);

  return {
    datum,
    handleCommon,
    itemDocumentForm,
    navigate,
    setDatum,
    isFormDocument,
    setItemDocumentForm,
    calculateTotal,
    deleteItem,
  };
};

export default useViewData;
