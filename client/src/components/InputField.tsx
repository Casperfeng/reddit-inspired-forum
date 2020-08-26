import React, { InputHTMLAttributes } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/core';
import { useField } from 'formik';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const InputField: React.FC<Props> = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Input {...field} id={props.name} placeholder={props.placeholder} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
