import Index from './index';

const FEATURE_PATH = '/report';

export default [
  {
    path: `${FEATURE_PATH}`,
    element: <Index />,
    exact: true,
  },
];
