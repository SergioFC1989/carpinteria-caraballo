//import/no-anonymous-default-export
import { Route, Routes as Switch, BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';
import { RecoilRoot } from 'recoil';

import theme from './theme';
import routesPath from './routes';
import GlobalStyle from './common/components/GlobalStyles';

const App = () => (
  <>
    <GlobalStyle />
    <Grommet theme={theme}>
      <BrowserRouter>
        <RecoilRoot>
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
