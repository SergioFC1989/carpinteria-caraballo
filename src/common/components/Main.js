import { useRecoilState } from 'recoil';
import { Box, Button, Header, Heading, Text } from 'grommet';
import { Group, Document, Note } from 'grommet-icons';

import useCommon from '../hooks/useCommon';
import { onAuthSignOut } from '../../api/auth/firebase-auth';
import { stateHeaderDefault } from '../context/common-context';

const Main = ({ children }) => {
  const { navigate } = useCommon();
  const [optionsHeader, setOptionsHeader] = useRecoilState(stateHeaderDefault);

  return (
    <>
      <Header fill="horizontal" background="#FFFFFFFF" pad="small">
        <Button
          size="medium"
          label="Carpinteria - Juan Antonio Caraballo"
          onClick={() => {
            setOptionsHeader({
              title: 'Bienvenid@!!',
              message: 'La app mas rápida y cómoda',
            });
            return navigate('/dashboard');
          }}
        />
        <Box direction="row" gap="medium">
          <Button
            size="small"
            icon={<Document size="small" color="medium-grey" />}
            label="Presupuestos"
            onClick={() => {
              setOptionsHeader({
                title: 'Presupuestos',
                message:
                  'Crea un nuevo presupuesto, o visualize y edite un documento existente',
              });
              return navigate('/dashboard/budget');
            }}
          />
          <Button
            size="small"
            icon={<Note size="small" color="medium-grey" />}
            label="Facturas"
            onClick={() => {
              setOptionsHeader({
                title: 'Facturas',
                message:
                  'Crea una nueva factura, o visualize y edite un documento existente',
              });
              return navigate('/dashboard/bill');
            }}
          />
          <Button
            size="small"
            icon={<Group size="small" color="medium-grey" />}
            label="Clientes"
            onClick={() => navigate('/dashboard/clients')}
          />
          <Button
            secondary
            size="small"
            label="Salir"
            onClick={() => onAuthSignOut()}
          />
        </Box>
      </Header>
      <Box fill="horizontal" height="100vh">
        <Box pad="small">
          <Heading margin="none">{optionsHeader?.title}</Heading>
          <Text margin="none" color="medium-grey">
            - {optionsHeader?.message} -
          </Text>
        </Box>
        {children}
      </Box>
    </>
  );
};

export default Main;
