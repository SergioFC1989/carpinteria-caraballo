import { Box, Button, Header } from 'grommet';
import { Group, Home, Document, Note, Power } from 'grommet-icons';
import Announcements from '../../common/components/Announcements';

const Dashboard = ({ children }) => (
  <>
    <Announcements />
    <Header fill="horizontal" background="brand" height="xxsmall" pad="small">
      <Button icon={<Home />} label="Carpinteria - Juan Antonio Caraballo" />
      <Box direction="row" gap="large">
        <Button icon={<Document />} label="Presupuestos" />
        <Button icon={<Note />} label="Facturas" />
        <Button icon={<Group />} label="Clientes" />
        <Button icon={<Power />} label="Salir" />
      </Box>
    </Header>
    <Box background="light-1" fill="horizontal" height="100vh">
      {children}
    </Box>
  </>
);

export default Dashboard;
