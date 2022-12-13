import routeBill from './views/Bill/route';
import routeBudget from './views/Budget/route';
import routeClients from './views/Client/route';
import routeDashboard from './views/Dashboard/route';
import routeLogin from './views/Login/route';
import routeMain from './views/Main/route';

export default [
  ...routeBill,
  ...routeBudget,
  ...routeClients,
  ...routeDashboard,
  ...routeLogin,
  ...routeMain,
];
