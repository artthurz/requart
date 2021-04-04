import React from "react";
import api from "../../../services/api";
import Modal from "react-modal";
import { Container } from "./styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import Switch from '@material-ui/core/Switch';

const validationSchema = yup.object({
  name: yup.string("Digite seu login").required("O login é obrigatório"),
  email: yup
    .string("Email")
    .email("Digite um email válido")
    .required("O email é obrigatório"),
  admin: yup.boolean("Admin"),
  login: yup.string("Login").required("O login é obrigatório"),
  password: yup
    .string("Senha")
    .min(6)
    .required("Defina uma senha para o usuário"),
  passwordConfirmation: yup.string().oneOf(
    [yup.ref("password"), null],
    "A senhas não conferem"
  ),
});

function NewUserModal({ isOpen, onRequestClose, fetchUsers }) {
  const handleCreateUser = async (values, resetForm) => {
    try {
      await api.post("users", values);
      resetForm({});
      if (fetchUsers) fetchUsers();
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar o usuário, revise seus dados.");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      login: "",
      password: "",
      passwordConfirmation: "",
      admin: false
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleCreateUser(values, resetForm);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <MdClose />
      </button>
      <Container onSubmit={formik.handleSubmit}>
        <h2>Cadastrar Usuário</h2>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          style={{ marginTop: "20px", marginBottom: "20px" }}
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
          style={{ marginBottom: "20px" }}
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
          style={{ marginBottom: "20px" }}
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <aside style={{ width: "100%"}}>
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          id="password"
          name="password"
          style={{ marginBottom: "20px", width: "45%"}}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          label="Confirme a senha"
          variant="outlined"
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          style={{ marginBottom: "20px", width: "45%", marginLeft: "10%"}}
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
        />
        </aside>
        <aside>
        <Switch
            checked={formik.values.admin}
            onChange={formik.handleChange}
            name="admin"
            color="primary"
          />
        <span>Administrador</span>
        </aside>
        <Button
          type="submit"
          className="new-user-modal-submit-button"
          fullWidth
          variant="contained"
        >
          Cadastrar
        </Button>
      </Container>
    </Modal>
  );
}

export default NewUserModal;
