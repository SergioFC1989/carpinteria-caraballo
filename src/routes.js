import routeBill from './views/Bill/route';
import routeBudget from './views/Budget/route';
import routeClients from './views/Client/route';
import routeDashboard from './views/Dashboard/route';
import routeLogin from './views/Login/route';
import routeReport from './views/Report/route';

export default [
  ...routeBill,
  ...routeBudget,
  ...routeClients,
  ...routeDashboard,
  ...routeLogin,
  ...routeReport,
];
