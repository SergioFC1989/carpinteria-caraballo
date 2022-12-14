import { useRecoilState } from 'recoil';
import { Box, Button, Header, Heading, Text } from 'grommet';
import { Group, Document, Note, Power } from 'grommet-icons';

import useCommon from '../hooks/useCommon';
import { onAuthSignOut } from '../../api/auth/firebase-auth';
import {
  stateFetchAPI,
  stateFormDocument,
  stateHeaderDefault,
} from '../context/common-context';

const Main = ({ children }) => {
  const { navigate } = useCommon();
  const [optionsHeader, setOptionsHeader] = useRecoilState(stateHeaderDefault);
  const [, setDatum] = useRecoilState(stateFetchAPI);
  const [, setDataFormDocument] = useRecoilState(stateFormDocument);

  return (
    <>
      <Header
        fill="horizontal"
        background="#FFFFFFFF"
        pad="small"
        border={{ side: 'bottom', color: 'brand' }}
      >
        <Button
          size="large"
          label="Carpinteria - Juan Antonio Caraballo"
          onClick={() => {
            setOptionsHeader({
              title: 'Bienvenid@!!',
              message: 'La app mas rápida y cómoda',
            });
            setDatum([]);
            setDataFormDocument([]);
            navigate('/dashboard');
          }}
        />
        <Box direction="row" gap="medium">
          <Button
            icon={<Document size="small" color="medium-grey" />}
            label="Presupuestos"
            onClick={() => {
              setOptionsHeader({
                title: 'Presupuestos',
                message:
                  'Crea un nuevo presupuesto, o visualize y edite un documento existente',
              });
              setDatum([]);
              setDataFormDocument([]);
              navigate('/dashboard/budget');
            }}
          />
          <Button
            icon={<Note size="small" color="medium-grey" />}
            label="Facturas"
            onClick={() => {
              setOptionsHeader({
                title: 'Facturas',
                message:
                  'Crea una nueva factura, o visualize y edite un documento existente',
              });
              setDatum([]);
              setDataFormDocument([]);
              navigate('/dashboard/bill');
            }}
          />
          <Button
            icon={<Group size="small" color="medium-grey" />}
            label="Clientes"
            onClick={() => {
              setDatum([]);
              setDataFormDocument([]);
              navigate('/dashboard/clients');
            }}
          />
          <Button
            icon={<Power size="small" color="status-error" />}
            label="Salir"
            onClick={() => onAuthSignOut()}
          />
        </Box>
      </Header>
      <Box fill="horizontal" align="center">
        <Box pad="small">
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
        {children}
      </Box>
    </>
  );
};

export default Main;
