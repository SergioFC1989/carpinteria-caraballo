import { Box, Button, Heading, Layer } from 'grommet';
import FieldSelectSearch from '../../../common/components/FieldSelectSearch';

const ModalClient = ({
  onClickOutside,
  onEsc,
  onClick,
  isButton,
  ...props
}) => (
  <Layer
    onClickOutside={onClickOutside}
    onEsc={onEsc}
    position="left"
    full="vertical"
  >
    <Box pad="medium" gap="medium">
      <Heading level={2} margin="none">
        Buscar cliente
      </Heading>
      <FieldSelectSearch label="Cliente" {...props} />
      <Button primary disabled={!isButton} label="Aceptar" onClick={onClick} />
    </Box>
  </Layer>
);

export default ModalClient;
