import { Box, Tab, Tabs } from 'grommet';
import Main from '../../common/components/Main';
import DocumentForm from '../DocumentForm';

const Budget = () => (
  <Main>
    <Box>
      <Tabs alignControls="start">
        <Tab title="Nuevo">
          <DocumentForm />
        </Tab>
        <Tab title="Visualizar">
          <Box pad="medium">Ver</Box>
        </Tab>
      </Tabs>
    </Box>
  </Main>
);

export default Budget;
