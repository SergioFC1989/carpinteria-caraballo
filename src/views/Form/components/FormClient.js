import { Box, Button, Heading } from 'grommet';
import { Search } from 'grommet-icons';
import Form from '../../../common/components/Form';
import { schemaFormClient } from '../propTypes/prop-types';
import useForm from '../hooks/useForm';

const FormClient = () => {
  const { addDataFormClient, isFormDetails, isFormDocument } = useForm();
  return (
    <Box fill="horizontal" gap="small" pad="small" animation="fadeIn">
      <Box
        direction="row"
        pad="small"
        align="center"
        justify="between"
        round="medium"
        background="light-2"
      >
        <Heading margin="none" level={2}>
          Datos del Cliente
        </Heading>
        <Button label="Buscar" icon={<Search />} />
      </Box>
      <Box pad="small">
        <Form
          disabledButton
          schema={schemaFormClient}
          onClickSubmit={(data) => {
            console.log(data);
            addDataFormClient(data);
            return isFormDetails();
          }}
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
