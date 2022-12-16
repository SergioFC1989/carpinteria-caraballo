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
  RadioButtonGroup,
  Text,
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
    resetField,
  } = useForm();

  const types = useMemo(
    () => ({
      text: (props, key) => (
        <Controller
          defaultValue=" "
          name={props.name}
          control={control}
          render={({ field }) => (
            <TextInput
              key={key}
              {...field}
              type="text"
              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
            />
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

  const onSubmit = (value) => {
    onClickSubmit(value);
    return schema.map((props) => resetField(props.key));
  };

  return (
    <GForm onSubmit={handleSubmit(onSubmit)}>
      <Box width={width} gap="medium" {...props}>
        <Box fill="horizontal" gap="small" direction={direction}>
          {schema.map((props, key) => (
            <Box key={key.id}>
              <Field key={key?.id} label={props.field} width={props.width}>
                {types[props.type](
                  {
                    ...register(props.key, { max: props.max, required: true }),
                  },
                  key,
                  props?.options
                )}
              </Field>
              {errors[props.key] && (
                <Text
                  key={key?.id}
                  margin="xxsmall"
                  color="status-error"
                  size="small"
                  weight="bold"
                >
                  {`Revise el campo ${props?.key} por favor`}
                </Text>
              )}
            </Box>
          ))}
        </Box>
        {children}
        {!disabledButton && (
          <Button fill primary label="Aceptar" type="submit" />
        )}
      </Box>
    </GForm>
  );
};

const propTypes = {
  onClickSubmit: PropTypes.func,
  disabledButton: PropTypes.bool,
  schema: PropTypes.array,
  width: PropTypes.any,
  direction: PropTypes.string,
};

const defaultProps = {
  disabledButton: false,
  schema: [{ field: '', key: '', type: '', options: [] }],
  width: 'medium',
  direction: 'column',
};

PropTypes.checkPropTypes(propTypes, defaultProps, 'prop', 'Form');

export default Form;
