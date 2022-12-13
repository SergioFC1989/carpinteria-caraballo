import Index from './index';

const FEATURE_PATH = '/dashboard/bill';

export default [
  {
    path: `${FEATURE_PATH}`,
    element: <Index />,
    exact: true,
  },
];
