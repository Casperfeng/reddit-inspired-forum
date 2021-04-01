import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputField from '../../components/InputField';
import Navbar from '../../components/Navbar';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage<{token: string}> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState('');
  return (
    <>
     <Navbar />
      <Wrapper size='small'>
        <Formik
          initialValues={{ newPassword: '', newPasswordConfirmed: '' }}
          onSubmit={async (values, { setErrors }) => {
            if (values.newPassword !== values.newPasswordConfirmed){
              setErrors({ newPasswordConfirmed: "Non-matching password" });
            }
            else {
              const response = await changePassword({
                newPassword: values.newPassword,
                token
              });

              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(response.data.changePassword.errors);
                if ('token' in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else if (response.data?.changePassword.user) {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>           
              <Box mt={4}>
              <Box mt={4}>
                <InputField
                  name='newPassword'
                  placeholder='new password'
                  label='Password'
                  type={'password'}
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name='newPasswordConfirmed'
                  placeholder='confirm new password'
                  label='Password'
                  type={'password'}
                />
              </Box>
              </Box>
              <Button
                mt={4}
                type='submit'
                variantColor='teal'
                isLoading={isSubmitting}
              >
                Change password
              </Button>
              {tokenError && <Box color='tomato'>{tokenError}</Box>}
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

ChangePassword.getInitialProps = ( {query} ) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient, { ssr: false})(ChangePassword as any);
