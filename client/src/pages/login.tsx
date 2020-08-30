import Navbar from '../components/Navbar';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';

const Login = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <>
      <Navbar />
      <Wrapper size='small'>
        <Formik
          initialValues={{ username: '', password: '' }}
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Login;
