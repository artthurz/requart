import React from "react";
import api from "../../services/api";
import Modal from "react-modal";
import { Container } from "./styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../contexts/auth";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import * as yup from "yup";
import { useFormik } from "formik";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import _ from "lodash";

const validationSchema = yup.object({
  name: yup.string("Digite seu login").required("O login é obrigatório"),
  description: yup
    .string("Descrição")
    .required("A descrição do projeto é obrigatória"),
  delivery_date: yup.date().required(),
});

function EditProjectModal({
  isOpen,
  onRequestClose,
  fetchProjects,
  project
}) {

  const handleUpdateProject = async (values) => {
    try {
      await api.put(`projects/${project.id}`, values);
      if (fetchProjects) await fetchProjects();
      toast.success("Projeto editado com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar o projeto, revise seus dados.");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: project.name,
      description: project.description,
      delivery_date: project.delivery_date,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdateProject(values);
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
        <h2>Editar Projeto</h2>
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
          label="Descrição"
          variant="outlined"
          multiline
          fullWidth
          id="description"
          name="description"
          style={{ marginBottom: "20px" }}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            id="delivery_date"
            name="delivery_date"
            variant="inline"
            inputVariant="outlined"
            label="Data de Entrega"
            invalidDateMessage="Formato de data inválido"
            format="dd/MM/yyyy"
            minDate={new Date()}
            value={formik.values.delivery_date}
            onChange={(val) => {
              formik.setFieldValue("delivery_date", val);
            }}
            error={
              formik.touched.delivery_date &&
              Boolean(formik.errors.delivery_date)
            }
            helperText={
              formik.touched.delivery_date && formik.errors.delivery_date
            }
            InputAdornmentProps={{ position: "start" }}
          />
        </MuiPickersUtilsProvider>
        <Button
          type="submit"
          className="new-project-modal-submit-button"
          fullWidth
          variant="contained"
        >
          Confrimar
        </Button>
      </Container>
    </Modal>
  );
}

export default EditProjectModal;
