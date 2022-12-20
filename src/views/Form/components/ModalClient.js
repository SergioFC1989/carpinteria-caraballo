import { Box, Button, Layer } from 'grommet';
import FieldSelectSearch from '../../../common/components/FieldSelectSearch';

const ModalClient = ({
  onClickOutside,
  onEsc,
  onClick,
  isButton,
  ...props
}) => (
  <Layer onClickOutside={onClickOutside} onEsc={onEsc}>
    <Box pad="small" gap="medium">
      <FieldSelectSearch label="Cliente" {...props} />
      {isButton && <Button primary label="Aceptar" onClick={onClick} />}
    </Box>
  </Layer>
);

export default ModalClient;
