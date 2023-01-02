import { Image } from 'grommet';
import Main from '../../common/components/Main';
import MyApp from '../../common/assets/app.svg';

const Dashboard = () => (
  <Main>
    <Image fit="container" src={MyApp} />
  </Main>
);
export default Dashboard;
