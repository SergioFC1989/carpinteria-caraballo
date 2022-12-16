import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import queryFirestoreAPI from '../../api/query/firebase-query';
import useCommon from '../../common/hooks/useCommon';

import {
  stateFetchAPI,
  stateFormDocument,
  stateFormClient,
  stateHeaderDefault,
  stateRefDoc,
  stateVisibilityForm,
} from '../../common/context/common-context';

const useForm = () => {
  const { handleCommon, handleErrors, navigate } = useCommon();
  const [itemDocumentForm, setItemDocumentForm] = useState([]);
  const [refDoc, setRefDoc] = useRecoilState(stateRefDoc);
  const [date, setDate] = useState(new Date().toISOString());
  const [isModalRef, setIsModalRef] = useState(false);
  const optionsHeader = useRecoilValue(stateHeaderDefault);
  const [, setVisibilityForm] = useRecoilState(stateVisibilityForm);
  const [datum, setDatum] = useRecoilState(stateFetchAPI);
  const [dataFormClient, setDataFormClient] = useRecoilState(stateFormClient);
  const [dataFormDocument, setDataFormDocument] = useRecoilState(
    stateFormDocument
  );

  const lastRef = (value = []) => {
    refDoc === 0 && setRefDoc(1);
    value.length > 0 &&
      (() => {
        const ref = value.map((elem) => elem?.Ref);
        console.log(ref);
        setRefDoc(Math.max(...ref) + 1);
      })();
  };

  const fetchAPI = async () => {
    try {
      handleCommon.show({ loading: true });
      const fetchData = await queryFirestoreAPI.GET.DOCUMENTS(
        optionsHeader.title.toLocaleLowerCase()
      );
      lastRef(fetchData);
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
      const total = Number(calculateTotalDocument().toFixed(2));
      const formDocument = [
        {
          Tipo: optionsHeader.title,
          Ref: refDoc,
          Fecha: new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          Documento: dataFormDocument,
          Total: total,
          Neto: total - (data.IVA / 100) * total,
          Cliente: dataFormClient,
          ...data,
        },
      ];
      await queryFirestoreAPI.POST.DOCUMENTS(
        optionsHeader.title.toLocaleLowerCase(),
        formDocument
      );
      setDatum((prev) => [...prev, ...formDocument]);
      setDataFormDocument([]);
      setDataFormClient([]);
      isFormDocument();
      setRefDoc(refDoc + 1);
      handleCommon.show({ loading: false });
      return handleCommon.notification(
        'Enhorabuena',
        'Los datos se registraron correctamente',
        'normal',
        true
      );
    } catch (error) {
      handleCommon.show({ loading: false });
      return handleErrors(error);
    }
  };

  const handleRefDoc = (value) => {
    setRefDoc(value?.Referencia);
    setIsModalRef(false);
  };

  useEffect(() => {
    console.log(datum);
    optionsHeader?.title === 'Bienvenid@!!' && navigate('/dashboard');
    datum.length <= 0 && fetchAPI();
  }, []);

  useEffect(() => {
    isModalRef && setIsModalRef(false);
  }, [refDoc]);

  return {
    datum,
    refDoc,
    dataFormDocument,
    itemDocumentForm,
    date,
    isModalRef,
    setIsModalRef,
    setRefDoc,
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
    handleRefDoc,
  };
};

export default useForm;
