import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/core';
import { Formik, Form } from 'formik';

interface Props {}

const Register: React.FC<Props> = ({}) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(values, handleChange) => (
        <Form>
          <FormControl>
            <FormLabel htmlFor='name'>Username</FormLabel>
            <Input
              value={values.username}
              id='username'
              placeholder='username'
              onChange={handleChange}
            />
            {/*<FormErrorMessage>{form.errors.name}</FormErrorMessage>*/}
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
