import Index from './index';

const FEATURE_PATH = '/dashboard/clients';

export default [
  {
    path: `${FEATURE_PATH}`,
    element: <Index />,
    exact: true,
  },
];
