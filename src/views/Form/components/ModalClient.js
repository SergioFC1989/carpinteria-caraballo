import { Box, Layer } from 'grommet';
import Form from '../../../common/components/Form';
import { schemaModalClients } from '../prop-types';

const ModalClient = ({ onClickOutside, onEsc, onSubmit }) => (
  <Layer onClickOutside={onClickOutside} onEsc={onEsc}>
    <Box pad="small" gap="small">
      <Form schema={schemaModalClients} onClickSubmit={onSubmit} />
    </Box>
  </Layer>
);

export default ModalClient;
