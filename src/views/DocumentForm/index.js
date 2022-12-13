import { Box, Button, Heading, Text } from 'grommet';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import queryFirestoreAPI from '../../api/query/firebase-query';

import CustomDataTable from '../../common/components/CustomDataTable';
import Form from '../../common/components/Form';
import { stateHeaderDefault } from '../../common/context/common-context';
import useCommon from '../../common/hooks/useCommon';

import { stateTableDocument } from './atom';

const DocumentForm = () => {
  const { handleCommon, handleErrors, navigate } = useCommon();
  const optionsHeader = useRecoilValue(stateHeaderDefault);
  const [, setDatum] = useState([]);
  const [itemDocumentForm, setItemDocumentForm] = useState([]);
  const [refDoc, setRefDoc] = useState('');
  const [dataDocumentForm, setDataDocumentForm] = useRecoilState(
    stateTableDocument
  );

  console.log(itemDocumentForm);

  const schemaDocumentForm = [
    { field: 'Unidad', key: 'Unidad', type: 'number' },
    { field: 'Precio', key: 'Precio', type: 'number' },
    { field: 'Concepto', key: 'Concepto', type: 'text' },
  ];

  const schemaDocumentColumns = ['Unidad', 'Concepto', 'Precio', 'Total'];

  const fetchData = async () => {
    try {
      handleCommon.show({ loading: true });
      const fetchBill = await queryFirestoreAPI.GET.DOCUMENTS(
        optionsHeader.title.toLocaleLowerCase()
      );
      const lastRef =
        fetchBill.length > 0 ? fetchBill.map((elem) => elem.ref) : 0;
      setDatum(fetchBill);
      setRefDoc(Math.max(lastRef) + 1);
      return handleCommon.show({ loading: false });
    } catch (error) {
      handleCommon.show({ loading: false });
      return handleErrors(error);
    }
  };

  const addItemInTable = (datum) => {
    const addTotal = { ...datum, Total: datum.Unidad * datum.Precio };
    setDataDocumentForm((prev) => [...prev, addTotal]);
  };

  const selectItemInTable = (datum) =>
    dataDocumentForm.filter(
      (item, i) =>
        item === datum &&
        setItemDocumentForm({
          index: i,
          data: datum,
        })
    );

  const deleteItemInTable = () => {
    const deleteItem = dataDocumentForm.filter(
      (elem, i) => i !== itemDocumentForm.index
    );
    setDataDocumentForm(deleteItem);
  };

  const calculateTotalDocument = () => {
    const totals = dataDocumentForm.map((elem) => elem.Total);
    return totals.reduce((acc, val) => acc + val);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    optionsHeader?.title === 'Bienvenid@!!'
      ? navigate('/dashboard')
      : fetchData();
    setDataDocumentForm([]);
  }, []);

  return (
    <Box width="xlarge" pad="small" gap="medium" animation="fadeIn">
      <Box
        direction="row"
        pad="small"
        justify="between"
        round="medium"
        background="light-2"
      >
        <Heading margin="none" level={2}>
          Nº Referencia: {refDoc}
        </Heading>
        <Heading margin="none" level={2}>
          {dataDocumentForm.length > 0
            ? `Total: ${calculateTotalDocument().toFixed(2)} €`
            : 'Total: 0 €'}
        </Heading>
      </Box>
      <Box pad="small" gap="small" background="light-1" round="medium">
        <Text margin="none" color="dark-3">
          Introduzca los datos necesarios para realizar el documento
        </Text>
        <Form
          disabledButton
          direction="row"
          schema={schemaDocumentForm}
          onClickSubmit={addItemInTable}
        >
          <Button label="Añadir" type="submit" />
        </Form>
      </Box>
      {dataDocumentForm.length > 0 && (
        <CustomDataTable
          actions
          options={{
            delete: true,
          }}
          schemaTable={schemaDocumentColumns}
          data={dataDocumentForm}
          onClickRow={({ datum }) => selectItemInTable(datum)}
          onClickDelete={deleteItemInTable}
        />
      )}
    </Box>
  );
};

export default DocumentForm;
