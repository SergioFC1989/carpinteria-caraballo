import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

const Field = ({ label, children, width, pad }) => (
  <Box width={width} pad={pad}>
    <Text margin="none" color="dark-light" weight="bold">
      {label}
    </Text>
    {children}
  </Box>
);

Field.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  pad: PropTypes.string,
};

Field.defaultProps = {
  label: '',
  width: '',
  pad: '',
};

export default Field;
