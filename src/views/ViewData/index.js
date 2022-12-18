import { useRecoilState } from 'recoil';
import { Box } from 'grommet';
import { stateFetchDatum } from '../../common/context/common-context';
import CustomDataTable from '../../common/components/CustomDataTable';
import schemaColumnsData from './prop-types';

const TableDocument = () => {
  const [datum] = useRecoilState(stateFetchDatum);
  return (
    <Box width="large" pad="small" gap="medium" animation="fadeIn">
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
  );
};

export default TableDocument;
