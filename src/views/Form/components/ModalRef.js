import { Box, Layer } from 'grommet';
import Form from '../../../common/components/Form';
import { schemaFormRefDoc } from '../prop-types';
import useForm from '../useForm';

const ModalRef = ({ ...props }) => {
  const { handleRefDoc } = useForm();

  return (
    <Layer {...props}>
      <Box width="medium" pad="small">
        <Form schema={schemaFormRefDoc} onClickSubmit={handleRefDoc} />
      </Box>
    </Layer>
  );
};

export default ModalRef;
