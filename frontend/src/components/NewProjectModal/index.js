import React, { useState } from "react";
import Modal from "react-modal";
import { Container } from "./styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

function NewProjectModal({ isOpen, onRequestClose }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <Container>
        <h2>Cadastrar Projeto</h2>
        <TextField label="Nome" variant="outlined" />
        <TextField label="Descrição" variant="outlined" />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Data de Entrega"
            invalidDateMessage="Formato de data inválido"
            format="dd/MM/yyyy"
            minDate={new Date}
            value={selectedDate}
            InputAdornmentProps={{ position: "start" }}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </Container>
    </Modal>
  );
}

export default NewProjectModal;
