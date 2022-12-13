import PropTypes from 'prop-types';
import { Box, Layer, Spinner, Paragraph } from 'grommet';

const LoadSpinner = ({ children, background, label, ...props }) => (
  <Box>
    <Layer position="center" background={background} {...props}>
      <Box fill gap="medium" align="center" justify="center" margin="large">
        {children}
        <Spinner alignSelf="center" color="brand" size="xlarge" />
        <Paragraph margin="none" size="medium" textAlign="center">
          {label}
        </Paragraph>
      </Box>
    </Layer>
  </Box>
);

LoadSpinner.propTypes = {
  background: PropTypes.string,
};

LoadSpinner.defaultProps = {
  background: 'none',
};

export default LoadSpinner;
