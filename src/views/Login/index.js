import { Box, Heading, Paragraph } from 'grommet';

import Form from '../../common/components/Form';
import Layout from '../../common/components/Layout';
import useLogin from './useLogin';

const Login = () => {
  const { schemaLogin, onLoginWithEmail } = useLogin();
  return (
    <Layout align="center">
      <Box width="large" justify="center" pad="small">
        <Box pad="small">
          <Heading fill margin="none" textAlign="center">
            Iniciar Sesion
          </Heading>
          <Paragraph fill margin="none" textAlign="center">
            - Carpinteria Juan Antonio Caraballo -
          </Paragraph>
        </Box>
        <Form
          width="large"
          schema={schemaLogin}
          onClickSubmit={(value) => onLoginWithEmail(value)}
        />
      </Box>
    </Layout>
  );
};

export default Login;
