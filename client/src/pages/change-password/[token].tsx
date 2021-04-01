import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import InputField from '../../components/InputField';
import Navbar from '../../components/Navbar';
import Wrapper from '../../components/Wrapper';

const ChangePassword: NextPage<{token: string}> = ({ token }) => {
  return (
    <>
     <Navbar />
      <Wrapper size='small'>
        <Formik
          initialValues={{ newPassword: '', newPasswordConfirmed: '' }}
          onSubmit={async (values, { setErrors }) => {
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
                  name='newPasswordConfirm'
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

export default ChangePassword;
