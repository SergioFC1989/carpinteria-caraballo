import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Box, Button, Heading, Tag } from 'grommet';
import { Search } from 'grommet-icons';

import Form from '../../../common/components/Form';
import Question from '../../../common/components/Question';
import ModalClient from './ModalClient';

import { schemaFormClient } from '../prop-types';

import useForm from '../useForm';
import useCommon from '../../../common/hooks/useCommon';

const FormClient = () => {
  const { isShow, handleCommon } = useCommon();
  const {
    dataFormClient,
    clients,
    setDataFormClient,
    isFormDetails,
    isFormDocument,
  } = useForm();

  useEffect(() => {
    Object.keys(dataFormClient).length > 0 &&
      handleCommon.show({ question: true });
    return () => {
      handleCommon.show({ clients: false, question: false });
    };
  }, []);

  return (
    <>
      {isShow.question && (
        <Question
          message="Actualmente tiene un cliente seleccionado. ¿Desea continuar?"
          onCancel={() => {
            handleCommon.show({ question: false });
            setDataFormClient({});
          }}
          onSubmit={() => {
            handleCommon.show({ question: false });
            return isFormDetails();
          }}
        >
          <Tag size="small" value={dataFormClient.Nombre} />
        </Question>
      )}
      {isShow.clients && (
        <ModalClient
          onEsc={() => {
            setDataFormClient({});
            return handleCommon.show({ clients: false });
          }}
          onClickOutside={() => {
            setDataFormClient({});
            return handleCommon.show({ clients: false });
          }}
          onClick={() => isFormDetails()}
          value={dataFormClient.Nombre}
          selectedClient={dataFormClient}
          options={clients.map((elem) => elem.Nombre)}
          onChange={({ option }) => {
            const foundClient = clients.find((cl) => cl.Nombre === option);
            setDataFormClient(foundClient);
          }}
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
              const addIdClient = {
                Id: nanoid(),
                ...data,
              };
              setDataFormClient(addIdClient);
              handleCommon.show({ clients: false });
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
