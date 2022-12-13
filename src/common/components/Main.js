import { Box, Button, Header, Text } from 'grommet';
import { Group, Document, Note, Power } from 'grommet-icons';
import { onAuthSignOut } from '../../api/auth/firebase-auth';
import useCommon from '../hooks/useCommon';

const Main = ({ children }) => {
  const { navigate } = useCommon();
  return (
    <>
      <Header fill="horizontal" background="#FFFFFFFF" pad="small">
        <Text>Carpinteria Juan Antonio Caraballo</Text>
        <Box direction="row" gap="large">
          <Button
            size="small"
            icon={<Document size="small" color="medium-grey" />}
            label="Presupuestos"
            onClick={() => navigate('/dashboard/budget')}
          />
          <Button
            size="small"
            icon={<Note size="small" color="medium-grey" />}
            label="Facturas"
            onClick={() => navigate('/dashboard/bill')}
          />
          <Button
            size="small"
            icon={<Group size="small" color="medium-grey" />}
            label="Clientes"
            onClick={() => navigate('/dashboard/clients')}
          />
          <Button
            size="small"
            icon={<Power size="small" color="status-error" />}
            label="Salir"
            onClick={() => onAuthSignOut()}
          />
        </Box>
      </Header>
      <Box background="light-1" fill="horizontal" height="100vh">
        {children}
      </Box>
    </>
  );
};

export default Main;
