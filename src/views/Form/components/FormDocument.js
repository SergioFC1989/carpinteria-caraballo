import { Box, Button, DateInput, Heading, Text } from 'grommet';
import { AddCircle, CircleInformation, Erase } from 'grommet-icons';

import CustomDataTable from '../../../common/components/CustomDataTable';
import Form from '../../../common/components/Form';
import Question from '../../../common/components/Question';
import ModalRef from './ModalRef';

import { schemaColumnsDocument, schemaFormDocument } from '../prop-types';
import useForm from '../useForm';
import useCommon from '../../../common/hooks/useCommon';

const FormDocument = () => {
  const { isShow, handleCommon } = useCommon();
  const {
    refDoc,
    dataFormDocument,
    date,
    isModalRef,
    setIsModalRef,
    isFormClient,
    addItemInTable,
    clearTableDocument,
    selectItemInTable,
    deleteItemInTable,
    calculateTotalDocument,
    onChangeDate,
    handleRefDoc,
  } = useForm();

  return (
    <>
      {isShow.question && (
        <Question
          message="¿Está seguro de que quiere eliminar los datos de la tabla?"
          onCancel={() => handleCommon.show({ question: false })}
          onSubmit={() => {
            handleCommon.show({ question: false });
            return clearTableDocument();
          }}
        />
      )}
      {isModalRef && (
        <ModalRef
          onSubmit={handleRefDoc}
          onClickOutside={() => setIsModalRef(false)}
          onEsc={() => setIsModalRef(false)}
        />
      )}
      <Box width="xlarge" pad="small" gap="medium" animation="fadeIn">
        <Box
          direction="row"
          pad="small"
          justify="between"
          round="medium"
          background="light-2"
        >
          <Box
            onClick={() => setIsModalRef(true)}
            title="Click aquí, para cambiar el numero de referencia"
          >
            <Heading margin="none" level={2}>
              Nº Referencia: {refDoc}
            </Heading>
          </Box>
          <Box width="medium">
            <DateInput
              format="dd/mm/yyyy"
              value={date}
              onChange={({ value }) => onChangeDate(value)}
            />
          </Box>
          <Heading margin="none" level={2}>
            {dataFormDocument.length > 0
              ? `Total: ${calculateTotalDocument().toFixed(2)} €`
              : 'Total: 0 €'}
          </Heading>
        </Box>
        <Box pad="small" gap="small" background="light-1" round="medium">
          <Box direction="row" gap="xsmall">
            <CircleInformation color="brand" />
            <Text fill margin="none" color="dark-grey" weight="bold">
              Introduzca los datos necesarios para realizar el documento
            </Text>
          </Box>
          <Form
            disabledButton
            direction="row"
            schema={schemaFormDocument}
            onClickSubmit={addItemInTable}
          >
            <Box fill="horizontal" direction="row" gap="medium" justify="end">
              <Button
                icon={<Erase />}
                label="Limpiar"
                onClick={() => handleCommon.show({ question: true })}
              />
              <Button icon={<AddCircle />} label="Añadir" type="submit" />
            </Box>
          </Form>
        </Box>
        {dataFormDocument.length > 0 && (
          <Box animation="fadeIn" gap="medium">
            <CustomDataTable
              actions
              options={{
                delete: true,
              }}
              schemaTable={schemaColumnsDocument}
              data={dataFormDocument}
              onClickRow={({ datum }) => selectItemInTable(datum)}
              onClickDelete={deleteItemInTable}
            />
            <Box width="medium" alignSelf="center">
              <Button primary label="Siguiente" onClick={isFormClient} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default FormDocument;
