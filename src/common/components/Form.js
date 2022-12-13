import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  DateInput,
  Form as GForm,
  TextInput,
  Select,
  Paragraph,
  RadioButtonGroup,
} from 'grommet';

import Field from './Field';
import FieldSelectSearch from './FieldSelectSearch';

const Form = ({
  children,
  onClickSubmit,
  schema = [],
  width,
  direction,
  disabledButton,
  ...props
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const types = useMemo(
    () => ({
      text: (props, key) => (
        <Controller
          name={props.name}
          control={control}
          render={({ field }) => (
            <Box width="large">
              <TextInput
                key={key}
                {...field}
                type="text"
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
            </Box>
          )}
        />
      ),
      number: (props, key) => (
        <TextInput step="any" key={key} type="number" {...props} />
      ),
      date: (props, key) => (
        <DateInput key={key} format="dd/mm/yyyy" {...props} />
      ),
      password: (props, key) => (
        <TextInput key={key} type="password" {...props} />
      ),
      email: (props, key) => <TextInput key={key} type="email" {...props} />,
      radio: (props, key, options) => (
        <Controller
          key={key}
          name={props.name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioButtonGroup {...field} options={options} name={props.name} />
          )}
        />
      ),
      select: (props, key, options) => (
        <Controller
          key={key}
          name={props.name}
          control={control}
          render={({ field }) => <Select {...field} options={options} />}
        />
      ),
      'select-search': (props, key, options) => (
        <Controller
          key={key}
          name={props.name}
          control={control}
          render={({ field }) => (
            <FieldSelectSearch {...field} options={options} />
          )}
        />
      ),
    }),
    [control]
  );

  const onSubmit = (value) => onClickSubmit(value);

  return (
    <GForm onSubmit={handleSubmit(onSubmit)}>
      <Box width={width} gap="medium" {...props}>
        <Box fill="horizontal" gap="small" direction={direction}>
          {schema.map((props, key) => (
            <Box key={key.id}>
              <Field key={key?.id} label={props.field}>
                {types[props.type](
                  { ...register(props.key, { required: true }) },
                  key,
                  props?.options
                )}
              </Field>
              {errors[props.key] && (
                <Paragraph key={key?.id} margin="none" color="red" size="small">
                  Revise este campo por favor
                </Paragraph>
              )}
            </Box>
          ))}
        </Box>
        {children}
        {!disabledButton && (
          <Button primary fill="horizontal" label="Aceptar" type="submit" />
        )}
      </Box>
    </GForm>
  );
};

const propTypes = {
  children: PropTypes.node.isRequired,
  onClickSubmit: PropTypes.func,
  disabledButton: PropTypes.bool,
  schema: PropTypes.array,
  width: PropTypes.any,
  direction: PropTypes.string,
};

const defaultProps = {
  disabledButton: false,
  children: null,
  schema: [{ field: '', key: '', type: '', options: [] }],
  width: 'medium',
  direction: 'column',
};

PropTypes.checkPropTypes(propTypes, defaultProps, 'prop', 'Form');

export default Form;
