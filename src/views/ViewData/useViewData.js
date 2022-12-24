import { useEffect, useState } from 'react';
import queryFirestoreAPI from '../../api/query/firebase-query';
import useCommon from '../../common/hooks/useCommon';
import useForm from '../Form/useForm';

const useViewData = () => {
  const { optionsHeader, handleCommon } = useCommon();
  const { datum, setDatum, calculateTotal } = useForm();
  const [itemDocumentForm, setItemDocumentForm] = useState({});

  const deleteItem = async () => {
    try {
      handleCommon.show({ loading: true });
      await queryFirestoreAPI.DELETE.DOCUMENT(
        optionsHeader.title.toLocaleLowerCase(),
        itemDocumentForm.idFirestore
      );
      const filteredData = datum.filter(
        (elem) => elem.Id !== itemDocumentForm.Id
      );
      setDatum(filteredData);
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
  };

  useEffect(() => {
    calculateTotal(datum);
  }, [datum]);

  return {
    datum,
    setDatum,
    setItemDocumentForm,
    calculateTotal,
    deleteItem,
    handleCommon,
  };
};

export default useViewData;
