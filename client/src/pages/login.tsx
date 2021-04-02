import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Navbar from '../components/Navbar';
import Wrapper from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

const Login = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <>
      <Navbar />
      <Wrapper size='small'>
        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login?.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login?.user) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='usernameOrEmail'
                placeholder='username or email'
                label='Username or Email'
              />
              <Box mt={4}>
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type={'password'}
                />
              </Box>
              <Box mt={4}>
              <Button
                mt={4}
                type='submit'
                variantColor='teal'
                isLoading={isSubmitting}
              >
                Login
              </Button>
              <NextLink href='/forgot-password'><Button
                mt={4}
                ml={2}
                type='submit'
                variantColor='teal'
              >
                Forgotten password
              </Button>
              </NextLink>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
