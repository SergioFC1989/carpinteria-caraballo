import { Image, ResponsiveContext } from 'grommet';
import { useContext } from 'react';
import MyApp from '../../common/assets/app.svg';
import Main from '../../common/components/Main';

const Dashboard = () => {
  const size = useContext(ResponsiveContext);
  return <Main>{size === 'large' && <Image fit="contain" src={MyApp} />}</Main>;
};
export default Dashboard;
