import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { nanoid } from 'nanoid';
import queryFirestoreAPI from '../../api/query/firebase-query';
import useCommon from '../../common/hooks/useCommon';

import {
  stateFetchDatum,
  stateFormDocument,
  stateFormClient,
  stateRefDoc,
  stateVisibilityForm,
  stateFetchClients,
} from '../../common/context/common-context';

const useForm = () => {
  const {
    handleCommon,
    handleErrors,
    navigate,
    fetchDatum,
    fetchClients,
    optionsHeader,
  } = useCommon();
  const [itemDocumentForm, setItemDocumentForm] = useState([]);
  const [date, setDate] = useState(new Date().toISOString());
  const [isModalRef, setIsModalRef] = useState(false);
  const [refDoc, setRefDoc] = useRecoilState(stateRefDoc);
  const [, setVisibilityForm] = useRecoilState(stateVisibilityForm);
  const [datum, setDatum] = useRecoilState(stateFetchDatum);
  const [clients, setClients] = useRecoilState(stateFetchClients);
  const [dataFormClient, setDataFormClient] = useRecoilState(stateFormClient);
  const [dataFormDocument, setDataFormDocument] = useRecoilState(
    stateFormDocument
  );

  const lastRef = (value = []) => {
    refDoc === 0 && setRefDoc(1);
    value.length > 0 &&
      (() => {
        const ref = value.map((elem) => elem?.Ref);
        setRefDoc(Math.max(...ref) + 1);
      })();
  };

  const handleInitializeForm = async () => {
    try {
      handleCommon.show({ loading: true });
      const getDatum = await fetchDatum();
      const getClients = await fetchClients();
      lastRef(getDatum);
      setDatum(getDatum);
      setClients(getClients);
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

  const calculateTotal = (data) => {
    const totals = data.map((elem) => elem?.Total);
    const addTotals = totals.reduce((acc, val) => acc + val);
    return Number(addTotals).toFixed(2);
  };

  const onChangeDate = (value) => setDate(value);

  const isFormDocument = () =>
    setVisibilityForm({ document: true, client: false, details: false });

  const isFormClient = () =>
    setVisibilityForm({ document: false, client: true, details: false });

  const isFormDetails = () =>
    setVisibilityForm({ document: false, client: false, details: true });

  const handleForm = async (data) => {
    handleCommon.show({ loading: true });
    try {
      const total = Number(calculateTotal(dataFormDocument));
      console.log(total);
      const formDocument = [
        {
          Id: nanoid(),
          Tipo: optionsHeader.title,
          Ref: refDoc,
          Fecha: new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          Documento: dataFormDocument,
          Total: total,
          Neto: Number(total - (data.IVA / 100) * total).toFixed(2),
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
      setDataFormClient({});
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
    optionsHeader?.title === 'Bienvenid@!!' && navigate('/dashboard');
    datum.length <= 0 && handleInitializeForm();
    dataFormDocument.length <= 0 && isFormDocument();
  }, []);

  useEffect(() => {
    isModalRef && setIsModalRef(false);
  }, [refDoc]);

  return {
    datum,
    clients,
    refDoc,
    dataFormDocument,
    dataFormClient,
    itemDocumentForm,
    date,
    isModalRef,
    setIsModalRef,
    setRefDoc,
    addItemInTable,
    clearTableDocument,
    selectItemInTable,
    deleteItemInTable,
    calculateTotal,
    onChangeDate,
    isFormDocument,
    isFormClient,
    isFormDetails,
    setDataFormDocument,
    setDataFormClient,
    setDatum,
    handleForm,
    handleRefDoc,
  };
};

export default useForm;
