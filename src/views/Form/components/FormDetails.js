import { Box, Button, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import Form from '../../../common/components/Form';
import useForm from '../hooks/useForm';
import { schemaFormDetails } from '../propTypes/prop-types';

const FormClient = () => {
  const { isFormDocument, handleForm } = useForm();
  return (
    <Box
      fill="horizontal"
      align="center"
      gap="small"
      pad="small"
      animation="fadeIn"
    >
      <Box direction="row" gap="xsmall">
        <CircleInformation color="brand" />
        <Text fill margin="none" color="dark-grey" weight="bold">
          Seleccione el detalle del trabajo e indique el IVA que desea aplicar
        </Text>
      </Box>
      <Box pad="small">
        <Form
          disabledButton
          schema={schemaFormDetails}
          onClickSubmit={(data) => handleForm(data)}
        >
          <Box width="medium" alignSelf="center" gap="small">
            <Button secondary label="Cancelar" onClick={isFormDocument} />
            <Button primary label="Siguiente" type="submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default FormClient;
