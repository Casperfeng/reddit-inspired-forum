import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import InputField from '../components/InputField';
import Navbar from '../components/Navbar';
import Wrapper from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';

interface forgotPasswordProps {

}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
        return (
        <>
          <Navbar />
            <Wrapper size='small'>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values, { setErrors }) => {

                }}
              >
                {({ isSubmitting }) => (
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
