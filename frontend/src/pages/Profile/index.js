import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container, FormContainer } from './styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Panel, PanelHeader } from '../../components/Panel';
import EditAvatarModal from './EditAvatarModal';
import { BiEditAlt } from 'react-icons/bi';

const validationSchema = yup.object({
  name: yup.string('Digite seu login').required('O login é obrigatório'),
  email: yup
    .string('Email')
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  login: yup.string('Login').required('O login é obrigatório'),
  oldPassword: yup
    .string('Senha antiga')
    .min(6)
    .when('password', (password, field) =>
      password
        ? field.required('Digite a senha antiga para definir uma nova')
        : field
    ),
  password: yup.string('Nova senha').min(6),
  passwordConfirmation: yup
    .string()
    .when('password', (password, field) =>
      password
        ? field
            .required('Confirme a nova senha')
            .oneOf([yup.ref('password'), null], 'A senhas não conferem')
        : field
    ),
});

function Profile() {
  const { user, handleReloadUser } = useAuth();
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleUpdateUser = async (values) => {
    console.log(values);
    try {
      const { data } = await api.put(`users/${user.id}`, values);
      handleReloadUser(data);
      toast.success('Perfil editado com sucesso!');
    } catch (error) {
      toast.error('Erro ao editar seu perfil, revise os dados.');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      login: user.login,
      avatar_id: user.avatar.id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdateUser(values);
    },
  });

  console.log(user.avatar.path);

  return (
    <Container>
      <Panel>
        <PanelHeader title="Editar Perfil" />
        <div className="edit-user-body ">
          <button
            className="avatar-button"
            onClick={() => setIsEditAvatarModalOpen(true)}
          >
            <img src={user.avatar.url} alt="Profile" />
            <BiEditAlt className="edit-icon" />
          </button>
          <FormContainer onSubmit={formik.handleSubmit}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              id="name"
              name="name"
              style={{ marginBottom: '20px' }}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              id="email"
              name="email"
              style={{ marginBottom: '20px' }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Login"
              variant="outlined"
              fullWidth
              id="login"
              name="login"
              style={{ marginBottom: '20px' }}
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
            />
            {!changePassword && (
              <button type="button" onClick={() => setChangePassword(true)}>
                Alterar senha?
              </button>
            )}
            {changePassword && (
              <>
                <h4>Alterar Senha</h4>
                <TextField
                  label="Senha antiga"
                  variant="outlined"
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  style={{
                    marginBottom: '20px',
                    marginTop: '20px',
                    width: '100%',
                  }}
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.oldPassword &&
                    Boolean(formik.errors.oldPassword)
                  }
                  helperText={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                />
                <aside style={{ width: '100%' }}>
                  <TextField
                    label="Nova Senha"
                    variant="outlined"
                    type="password"
                    id="password"
                    name="password"
                    style={{ marginBottom: '20px', width: '45%' }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <TextField
                    label="Confirme a nova senha"
                    variant="outlined"
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    style={{
                      marginBottom: '20px',
                      width: '45%',
                      marginLeft: '10%',
                    }}
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.passwordConfirmation &&
                      Boolean(formik.errors.passwordConfirmation)
                    }
                    helperText={
                      formik.touched.passwordConfirmation &&
                      formik.errors.passwordConfirmation
                    }
                  />
                </aside>
              </>
            )}
            <Button
              type="submit"
              className="edit-profile-modal-submit-button"
              fullWidth
              variant="contained"
            >
              Confrimar
            </Button>
          </FormContainer>
        </div>
      </Panel>
      <EditAvatarModal
        isOpen={isEditAvatarModalOpen}
        onRequestClose={() => setIsEditAvatarModalOpen(false)}
        project={user}
      />
    </Container>
  );
}

export default Profile;
