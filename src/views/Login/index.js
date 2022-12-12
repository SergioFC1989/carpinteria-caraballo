import { Box, Heading, Page, PageContent, Paragraph } from 'grommet';
import Announcements from '../../common/components/Announcements';
import Form from '../../common/components/Form';
import useLogin from './useLogin';

const Login = () => {
  const { schemaLogin, onLoginWithEmail } = useLogin();
  return (
    <>
      <Announcements />
      <Page kind="narrow" justify="center" pad="small">
        <PageContent background="light-1" gap="small" round="small">
          <Box pad="small">
            <Heading fill margin="none" textAlign="center">
              Iniciar Sesion
            </Heading>
            <Paragraph fill margin="none" textAlign="center">
              - Carpinteria Juan Antonio Caraballo -
            </Paragraph>
          </Box>
          <Form
            schema={schemaLogin}
            onClickSubmit={(value) => onLoginWithEmail(value)}
          />
        </PageContent>
      </Page>
    </>
  );
};

export default Login;
