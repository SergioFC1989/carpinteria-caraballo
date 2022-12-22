import { Box, Heading, Page, PageContent } from 'grommet';
import CustomDataTable from '../../common/components/CustomDataTable';
import schemaColumnsData from './prop-types';
import useForm from '../Form/useForm';

const TableDocument = () => {
  const { datum, calculateTotal } = useForm();

  console.log(
    datum.map((elem) =>
      elem.Documento.reduce((acc, val) => acc.Total + val.Total)
    )
  );

  return (
    <Page kind="narrow" justify="center" pad="small">
      <PageContent gap="small" align="center">
        <Box width="large" pad="small" gap="medium" animation="fadeIn">
          <Box
            direction="row"
            pad="small"
            justify="between"
            round="medium"
            background="light-2"
          >
            <Heading margin="none" level={2}>
              {`Nº Documentos: ${datum.length}`}
            </Heading>
            <Heading margin="none" level={2}>
              {`Total: ${datum.length > 0 && calculateTotal(datum)} €`}
            </Heading>
          </Box>
          <CustomDataTable
            actions
            data={datum}
            schemaTable={schemaColumnsData}
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
          />
        </Box>
      </PageContent>
    </Page>
  );
};

export default TableDocument;
