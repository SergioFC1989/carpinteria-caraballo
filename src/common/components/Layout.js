import { Box } from 'grommet';
import PropTypes from 'prop-types';

const Layout = ({ background, align, children }) => (
  <Box
    fill="horizontal"
    height="100vh"
    gap="small"
    animation="fadeIn"
    align={align}
    background={background}
  >
    {children}
  </Box>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
