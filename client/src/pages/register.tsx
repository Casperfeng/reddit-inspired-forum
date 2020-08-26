import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import Wrapper from '../components/Wrapper';

interface Props {}

const Register: React.FC<Props> = ({}) => {
  return (
    <Wrapper>
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
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
