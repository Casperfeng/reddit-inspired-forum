import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Navbar from '../components/Navbar';
import Wrapper from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface forgotPasswordProps {

}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  
  return (
  <>
    <Navbar />
      <Wrapper size='small'>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values, { setErrors }) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) => complete ? <Box>If an account with that email exists, we've sent an email</Box> : (
            <Form>
              <InputField
                name='email'
                placeholder='email'
                label='Email'
              />
              <Box mt={4}>
              <Button
                mt={4}
                type='submit'
                variantColor='teal'
                isLoading={isSubmitting}
              >
                Forgot password
              </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
  </>);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ForgotPassword);
