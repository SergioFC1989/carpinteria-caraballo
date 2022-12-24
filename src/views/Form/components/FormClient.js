import { useContext, useEffect } from 'react';
import { Box, Button, Heading, ResponsiveContext, Tag } from 'grommet';
import { Search } from 'grommet-icons';

import Form from '../../../common/components/Form';
import Question from '../../../common/components/Question';
import ModalClient from './ModalClient';

import { schemaFormClient } from '../prop-types';

import useForm from '../useForm';
import useCommon from '../../../common/hooks/useCommon';

const FormClient = () => {
  const size = useContext(ResponsiveContext);
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
      <Box width="xlarge" pad="small" gap="medium" animation="fadeIn">
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
        <Box pad="small" gap="small" background="light-1" round="medium">
          <Form
            disabledButton
            schema={schemaFormClient}
            onClickSubmit={(data) => {
              setDataFormClient(data);
              handleCommon.show({ clients: false });
              return isFormDetails();
            }}
          >
            <Box
              gap="small"
              width="medium"
              alignSelf={size !== 'large' && 'center'}
              direction={size !== 'large' ? 'column' : 'row'}
            >
              <Button
                fill
                secondary
                label="Cancelar"
                onClick={isFormDocument}
              />
              <Button fill primary label="Siguiente" type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </>
  );
};

export default FormClient;
