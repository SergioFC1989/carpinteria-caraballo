import Index from './index';

const FEATURE_PATH = '/login';

export default [
  {
    path: `${FEATURE_PATH}`,
    element: <Index />,
    exact: true,
  },
];
