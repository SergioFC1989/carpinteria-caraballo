import { Box, Button, Heading } from 'grommet';
import { Search } from 'grommet-icons';
import Form from '../../../common/components/Form';

import { schemaFormClient } from '../prop-types';

import useForm from '../useForm';
import useCommon from '../../../common/hooks/useCommon';
import ModalClient from './ModalClient';

const FormClient = () => {
  const { isShow, handleCommon } = useCommon();
  const {
    addDataFormClient,
    isFormDetails,
    isFormDocument,
    clients,
  } = useForm();
  return (
    <>
      {isShow.clients && (
        <ModalClient
          onEsc={() => handleCommon.show({ clients: false })}
          onClickOutside={() => handleCommon.show({ clients: false })}
        />
      )}
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
          <Button
            label="Buscar"
            icon={<Search />}
            onClick={() => {
              clients.length <= 0
                ? handleCommon.notification(
                    'Lo sentimos',
                    'No tenemos ningún cliente registrado',
                    'critical',
                    true
                  )
                : handleCommon.show({ clients: true });
            }}
          />
        </Box>
        <Box pad="small">
          <Form
            disabledButton
            schema={schemaFormClient}
            onClickSubmit={(data) => {
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
    </>
  );
};

export default FormClient;
