import { useRecoilValue } from 'recoil';
import { Box, Tab, Tabs } from 'grommet';

import Main from '../../common/components/Main';
import FormDocument from '../Form/components/FormDocument';
import FormClient from '../Form/components/FormClient';
import FormDetails from '../Form/components/FormDetails';

import { stateVisibilityForm } from '../../common/context/common-context';
import ViewData from '../ViewData/index';

const Bill = () => {
  const visible = useRecoilValue(stateVisibilityForm);
  return (
    <Main>
      <Tabs>
        <Tab title="Nuevo">
          {visible.document && <FormDocument />}
          {visible.client && <FormClient />}
          {visible.details && <FormDetails />}
        </Tab>
        <Tab title="Visualizar">
          <Box pad="medium">
            <ViewData />
          </Box>
        </Tab>
      </Tabs>
    </Main>
  );
};

export default Bill;
