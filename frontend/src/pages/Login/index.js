import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { Span, Image, Container } from './styles';
import { useAuth } from '../../hooks/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
  login: yup.string('Digite seu login').required('O login é obrigatório'),
  password: yup
    .string('Digite sua senha')
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const history = useHistory();

  async function handleSubmit(values) {
    try {
      await handleLogin({
        login: values.login,
        password: values.password,
      });
    } catch (error) {
      console.error(error);
    } finally {
      history.push('/home');
    }
  }

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Image src={logo} alt="Requart" />
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="login"
              name="login"
              label="Login"
              style={{ marginBottom: '20px' }}
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Senha"
              type="password"
              style={{ marginBottom: '20px' }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Span>
              Ao clicar em Entrar, você concorda com nossos Termos de Uso e
              Serviços e Política de Dados e Privacidade.
            </Span>
            <Button color="primary" variant="contained" fullWidth type="submit" style={{textTransform: "none"}}>
              Entrar
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default Login;
