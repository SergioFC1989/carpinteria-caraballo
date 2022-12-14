import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import queryFirestoreAPI from '../../../api/query/firebase-query';
import useCommon from '../../../common/hooks/useCommon';

import {
  stateFetchAPI,
  stateHeaderDefault,
  stateFormDocument,
  stateVisibilityForm,
  stateFormClient,
} from '../../../common/context/common-context';

const useDocumentForm = () => {
  const { handleCommon, handleErrors, navigate } = useCommon();
  const [itemDocumentForm, setItemDocumentForm] = useState([]);
  const [refDoc, setRefDoc] = useState(1);
  const [date, setDate] = useState(new Date().toISOString());
  const optionsHeader = useRecoilValue(stateHeaderDefault);
  const [, setVisibilityForm] = useRecoilState(stateVisibilityForm);
  const [datum, setDatum] = useRecoilState(stateFetchAPI);
  const [dataFormClient, setDataFormClient] = useRecoilState(stateFormClient);
  const [dataFormDocument, setDataFormDocument] = useRecoilState(
    stateFormDocument
  );

  const lastRef = (value = []) => {
    const ref = value.map((elem) => elem?.Ref);
    setRefDoc(Math.max(...ref) + 1);
  };

  const fetchAPI = async () => {
    try {
      handleCommon.show({ loading: true });
      const fetchData = await queryFirestoreAPI.GET.DOCUMENTS(
        optionsHeader.title.toLocaleLowerCase()
      );
      fetchData.length > 0 && lastRef(fetchData);
      setDatum(fetchData);
      return handleCommon.show({ loading: false });
    } catch (error) {
      handleCommon.show({ loading: false });
      return handleErrors(error);
    }
  };

  const addItemInTable = (datum) => {
    const addTotal = { ...datum, Total: datum.Unidad * datum.Precio };
    setDataFormDocument((prev) => [...prev, addTotal]);
  };

  const clearTableDocument = () => {
    setDataFormDocument([]);
  };

  const selectItemInTable = (datum) =>
    dataFormDocument.filter(
      (item, i) =>
        item === datum &&
        setItemDocumentForm({
          index: i,
          data: datum,
        })
    );

  const deleteItemInTable = () => {
    const deleteItem = dataFormDocument.filter(
      (elem, i) => i !== itemDocumentForm.index
    );
    setDataFormDocument(deleteItem);
  };

  const calculateTotalDocument = () => {
    const totals = dataFormDocument.map((elem) => elem.Total);
    return totals.reduce((acc, val) => acc + val);
  };

  const onChangeDate = (value) => setDate(value);

  const isFormDocument = () =>
    setVisibilityForm({ document: true, client: false, details: false });

  const isFormClient = () =>
    setVisibilityForm({ document: false, client: true, details: false });

  const isFormDetails = () =>
    setVisibilityForm({ document: false, client: false, details: true });

  const addDataFormClient = (datum) => setDataFormClient(datum);

  const handleForm = async (data) => {
    try {
      handleCommon.show({ loading: true });
      const formDocument = [
        {
          Ref: refDoc,
          Fecha: date,
          Documento: dataFormDocument,
          Total: calculateTotalDocument().toFixed(2),
          Cliente: dataFormClient,
          ...data,
        },
      ];
      await queryFirestoreAPI.POST.DOCUMENTS(
        optionsHeader.title.toLocaleLowerCase(),
        formDocument
      );
      handleCommon.show({ loading: false });
      handleCommon.notification({
        title: 'Enhorabuena',
        message: 'Los datos se registraron correctamente',
        status: 'normal',
        visible: true,
      });
      setDatum((prev) => [...prev, ...formDocument]);
      setDataFormDocument([]);
      setDataFormClient([]);
      return isFormDocument();
    } catch (error) {
      handleCommon.show({ loading: false });
      return handleErrors(error);
    }
  };

  useEffect(() => {
    console.log(datum);
    optionsHeader?.title === 'Bienvenid@!!' && navigate('/dashboard');
    datum.length <= 0 ? fetchAPI() : lastRef(datum);
  }, []);

  return {
    datum,
    refDoc,
    dataFormDocument,
    itemDocumentForm,
    date,
    addItemInTable,
    clearTableDocument,
    selectItemInTable,
    deleteItemInTable,
    calculateTotalDocument,
    onChangeDate,
    isFormDocument,
    isFormClient,
    isFormDetails,
    addDataFormClient,
    handleForm,
  };
};

export default useDocumentForm;
