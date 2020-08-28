import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { useMutation } from 'urql';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';

interface Props {}

const REGISTER_MUTATION = `mutation Register($username: String!, $password: String!) {
  register(options: { username: $username, password: $password}){
    user {
      id
      username      
    }
    errors {
      message
      field
    } 
  }
}`;

const Register: React.FC<Props> = ({}) => {
  const [, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper size='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='username'
              label='Username'
            />
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type={'password'}
              />
            </Box>
            <Button
              mt={4}
              type='submit'
              variantColor='teal'
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
