import { useContext } from 'react';
import { Box, Button, ResponsiveContext, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import Form from '../../../common/components/Form';
import useForm from '../useForm';
import { schemaFormDetails } from '../prop-types';

const FormClient = () => {
  const size = useContext(ResponsiveContext);
  const { isFormClient, handleForm } = useForm();
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
          <Box fill="horizontal" align="center">
            <Box
              gap="small"
              width="large"
              justify="center"
              direction={size !== 'large' ? 'column' : 'row'}
            >
              <Button
                secondary
                fill="horizontal"
                label="Cancelar"
                onClick={isFormClient}
              />
              <Button
                primary
                fill="horizontal"
                label="Siguiente"
                type="submit"
              />
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default FormClient;
