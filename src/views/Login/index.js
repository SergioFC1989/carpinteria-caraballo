import { Box, Heading, Page, PageContent, Paragraph } from 'grommet';

import Form from '../../common/components/Form';
import useLogin from './useLogin';

const Login = () => {
  const { schemaLogin, onLoginWithEmail } = useLogin();
  return (
    <Page kind="narrow" justify="center" pad="small">
      <PageContent gap="small" align="center">
        <Box pad="small">
          <Heading fill margin="none" textAlign="center">
            Iniciar Sesion
          </Heading>
          <Paragraph fill margin="none" textAlign="center">
            - Carpinteria Juan Antonio Caraballo -
          </Paragraph>
        </Box>
        <Form
          width="medium"
          schema={schemaLogin}
          onClickSubmit={(value) => onLoginWithEmail(value)}
        />
      </PageContent>
    </Page>
  );
};

export default Login;
