import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Header,
  Heading,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Group, Document, Note, Power, Menu, FormDown } from 'grommet-icons';
import { onAuthSignOut } from '../../api/auth/firebase-auth';
import useForm from '../../views/Form/useForm';
import useCommon from '../hooks/useCommon';
import Question from './Question';

const Main = ({ children }) => {
  const size = useContext(ResponsiveContext);
  const {
    navigate,
    handleCommon,
    isShow,
    optionsHeader,
    setOptionsHeader,
  } = useCommon();
  const { setDataFormDocument, setDatum, setRefDoc } = useForm();
  const [open, setOpen] = useState(false);

  return (
    <>
      {isShow.question && (
        <Question
          message="¿Está seguro de que quiere cerrar la sesión?"
          onCancel={() => handleCommon.show({ question: false })}
          onSubmit={() => {
            handleCommon.show({ question: false });
            return onAuthSignOut();
          }}
        />
      )}
      <Header
        fill="horizontal"
        direction="row"
        background="brand"
        pad={size !== 'large' ? 'medium' : 'small'}
        border={{ side: 'bottom', color: 'text' }}
      >
        {size !== 'large' ? (
          <Box>
            <Button
              icon={open ? <FormDown /> : <Menu />}
              onClick={() => setOpen(!open)}
              label={
                <Heading margin="none" level={3} color="white">
                  app-Carpinteria
                </Heading>
              }
            />
            <Box>
              <Collapsible open={open}>
                <Box
                  align="start"
                  gap="small"
                  margin={{ vertical: 'medium' }}
                  animation="slideDown"
                >
                  <Button
                    icon={<Document size="small" color="text" />}
                    label="Presupuestos"
                    onClick={() => {
                      if (optionsHeader?.title !== 'Presupuestos') {
                        setOptionsHeader({
                          title: 'Presupuestos',
                          message:
                            'Crea un nuevo presupuesto, o visualize y edite un documento existente',
                        });
                        setDatum([]);
                        setDataFormDocument([]);
                        setRefDoc(0);
                        navigate('/dashboard/budget');
                      }
                    }}
                  />
                  <Button
                    icon={<Note size="small" color="text" />}
                    label="Facturas"
                    onClick={() => {
                      if (optionsHeader?.title !== 'Facturas') {
                        setOptionsHeader({
                          title: 'Facturas',
                          message:
                            'Crea una nueva factura, o visualize y edite un documento existente',
                        });
                        setDatum([]);
                        setDataFormDocument([]);
                        setRefDoc(0);
                        navigate('/dashboard/bill');
                      }
                    }}
                  />
                  <Button
                    icon={<Group size="small" color="text" />}
                    label="Clientes"
                    onClick={() => {
                      if (optionsHeader?.title !== 'Clientes') {
                        setDatum([]);
                        setDataFormDocument([]);
                        setRefDoc(0);
                        navigate('/dashboard/clients');
                      }
                    }}
                  />
                  <Button
                    icon={<Power size="small" color="status-error" />}
                    label="Salir"
                    onClick={() => handleCommon.show({ question: true })}
                  />
                </Box>
              </Collapsible>
            </Box>
          </Box>
        ) : (
          <>
            <Button
              primary
              label={
                <Heading margin="none" level={3}>
                  app-Carpinteria
                </Heading>
              }
              onClick={() => {
                setOptionsHeader({
                  title: 'Bienvenid@!!',
                  message: 'La app mas rápida y cómoda',
                });
                setDatum([]);
                setDataFormDocument([]);
                setRefDoc(0);
                navigate('/dashboard');
              }}
            />
            <Box direction="row" gap="medium">
              <Button
                icon={<Document size="medium" color="text" />}
                label="Presupuestos"
                onClick={() => {
                  if (optionsHeader?.title !== 'Presupuestos') {
                    setOptionsHeader({
                      title: 'Presupuestos',
                      message:
                        'Crea un nuevo presupuesto, o visualize y edite un documento existente',
                    });
                    setDatum([]);
                    setDataFormDocument([]);
                    setRefDoc(0);
                    navigate('/dashboard/budget');
                  }
                }}
              />
              <Button
                icon={<Note size="medium" color="text" />}
                label="Facturas"
                onClick={() => {
                  if (optionsHeader?.title !== 'Facturas') {
                    setOptionsHeader({
                      title: 'Facturas',
                      message:
                        'Crea una nueva factura, o visualize y edite un documento existente',
                    });
                    setDatum([]);
                    setDataFormDocument([]);
                    setRefDoc(0);
                    navigate('/dashboard/bill');
                  }
                }}
              />
              <Button
                icon={<Group size="medium" color="text" />}
                label="Clientes"
                onClick={() => {
                  if (optionsHeader?.title !== 'Clientes') {
                    setDatum([]);
                    setDataFormDocument([]);
                    setRefDoc(0);
                    navigate('/dashboard/clients');
                  }
                }}
              />
              <Button
                secondary
                size="small"
                icon={<Power size="medium" color="status-error" />}
                label="Salir"
                onClick={() => handleCommon.show({ question: true })}
              />
            </Box>
          </>
        )}
      </Header>
      <Box fill="horizontal" align="center">
        <Box pad="xxsmall">
          <Heading margin="none" textAlign="center">
            {optionsHeader?.title}
          </Heading>
          <Text
            margin="none"
            textAlign="center"
            color="medium-grey"
            weight="bold"
          >
            - {optionsHeader?.message} -
          </Text>
        </Box>
        <Box align="center">{children}</Box>
      </Box>
    </>
  );
};

export default Main;
