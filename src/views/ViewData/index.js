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
    navigate,
    calculateTotal,
    deleteItem,
    setItemDocumentForm,
  } = useViewData();
  console.log(datum);
  return (
    <>
      {isShow.question && (
        <Question
          message="¿Está seguro de que quiere eliminar el registro de la tabla?"
          onCancel={() => handleCommon.show({ question: false })}
          onSubmit={deleteItem}
        />
      )}
      <Box fill="horizontal" pad="small" gap="medium" animation="fadeIn">
        {datum.length > 0 && (
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
              {`Total: ${datum.length > 0 && calculateTotal(datum)} €`}
            </Heading>
          </Box>
        )}
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
          onClickReport={() => navigate('/report')}
          onClickDelete={() => handleCommon.show({ question: true })}
          onClickEdit={() => {
            handleCommon.show({ isEditForm: true });
            return navigate('/report');
          }}
        />
      </Box>
    </>
  );
};

export default TableDocument;
