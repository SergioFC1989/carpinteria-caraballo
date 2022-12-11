import PropTypes from 'prop-types';
import { useState } from 'react';
import { Select } from 'grommet';

import Field from './Field';

const FieldSelectSearch = ({ label, options, ...props }) => {
  const [list, setList] = useState(options);
  return (
    <Field width="medium" label={label}>
      <Select
        onSearch={(text) => {
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
          const exp = new RegExp(escapedText, 'i');
          setList(options.filter((o) => exp.test(o)));
        }}
        onOpen={() => setList(options)}
        onClose={() => setList(options)}
        options={list}
        {...props}
      />
    </Field>
  );
};

FieldSelectSearch.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
};

FieldSelectSearch.defaultProps = {
  label: '',
  options: [],
};

export default FieldSelectSearch;
