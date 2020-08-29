import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper size='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
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
