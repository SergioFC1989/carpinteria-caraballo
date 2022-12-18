import { Box, Layer } from 'grommet';
import Form from '../../../common/components/Form';
import { schemaModalRefDoc } from '../prop-types';

const ModalRef = ({ onSubmit, ...props }) => (
  <Layer {...props}>
    <Box width="medium" pad="small">
      <Form schema={schemaModalRefDoc} onClickSubmit={onSubmit} />
    </Box>
  </Layer>
);

export default ModalRef;
