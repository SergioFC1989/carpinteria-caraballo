import Index from './index';

const FEATURE_PATH = '/dashboard';

export default [
  {
    path: `${FEATURE_PATH}`,
    element: <Index />,
    exact: true,
  },
];
