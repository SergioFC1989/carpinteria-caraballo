import { Box } from 'grommet';
import PropTypes from 'prop-types';

const Layout = ({ background, align, children, ...props }) => (
  <Box
    fill="horizontal"
    gap="small"
    animation="fadeIn"
    align={align}
    background={background}
    {...props}
  >
    {children}
  </Box>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
