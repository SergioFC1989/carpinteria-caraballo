//import/no-anonymous-default-export
import { Route, Routes as Switch, BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';
import { RecoilRoot } from 'recoil';

import GlobalStyle from './common/components/GlobalStyles';
import theme from './theme';
import Announcements from './common/components/Announcements';
import routesPath from './routes';

const App = () => (
  <>
    <GlobalStyle />
    <Grommet theme={theme}>
      <BrowserRouter>
        <RecoilRoot>
          <Announcements />
          <Switch>
            {routesPath.map(({ path, ...props }) => (
              <Route key={path} path={path} {...props} />
            ))}
          </Switch>
        </RecoilRoot>
      </BrowserRouter>
    </Grommet>
  </>
);

export default App;
