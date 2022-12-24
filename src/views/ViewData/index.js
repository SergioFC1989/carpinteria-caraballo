import { useContext } from 'react';
import { Box, Heading, ResponsiveContext } from 'grommet';
import CustomDataTable from '../../common/components/CustomDataTable';
import schemaColumnsData from './prop-types';
import useViewData from './useViewData';
import useCommon from '../../common/hooks/useCommon';
import Question from '../../common/components/Question';

const TableDocument = () => {
  const size = useContext(ResponsiveContext);
  const { isShow, handleCommon } = useCommon();
  const {
    datum,
    calculateTotal,
    deleteItem,
    setItemDocumentForm,
  } = useViewData();

  return (
    <>
      {isShow.question && (
        <Question
          message="¿Está seguro de que quiere eliminar el registro de la tabla?"
          onCancel={() => handleCommon.show({ question: false })}
          onSubmit={() => deleteItem()}
        />
      )}
      <Box fill="horizontal" pad="small" gap="medium" animation="fadeIn">
        <Box
          direction={size !== 'large' ? 'column' : 'row'}
          pad="small"
          gap="small"
          round="medium"
          background="light-2"
          justify={size === 'large' ? 'between' : 'start'}
        >
          <Heading margin="none" level={2}>
            {`Nº Documentos: ${datum.length}`}
          </Heading>
          <Heading margin="none" level={2}>
            {`Total: ${datum.length > 0 && calculateTotal(datum).toFixed(2)} €`}
          </Heading>
        </Box>
        <CustomDataTable
          actions
          data={datum}
          schemaTable={schemaColumnsData}
          onClickRow={({ datum }) => setItemDocumentForm(datum)}
          options={{
            delete: true,
            edit: true,
            report: true,
          }}
          sort={{
            direction: 'asc',
            property: 'Ref',
          }}
          onClickView={() => {}}
          onClickDelete={() => handleCommon.show({ question: true })}
        />
      </Box>
    </>
  );
};

export default TableDocument;
