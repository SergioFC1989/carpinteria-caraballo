import { Box, Button, Layer, Text } from 'grommet';

const Question = ({ message, onCancel, onSubmit, children, ...props }) => (
  <Layer {...props}>
    <Box pad="small" gap="small" align="center">
      <Text textAlign="center" weight="bold" margin="none">
        {message}
      </Text>
      {children}
      <Box direction="row" gap="small">
        <Box width="small">
          <Button secondary fill label="Cancelar" onClick={onCancel} />
        </Box>
        <Box width="small">
          <Button primary fill label="Aceptar" onClick={onSubmit} />
        </Box>
      </Box>
    </Box>
  </Layer>
);

export default Question;
