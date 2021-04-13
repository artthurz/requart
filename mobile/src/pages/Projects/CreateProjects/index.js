import React, { useState } from "react";
import { Container, Card, Title } from "./styles"
import axios from "axios";
import { Button, TextInput, Colors, Snackbar } from "react-native-paper";

export default function CreateProjects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const onToggleSnackBar = () => {
    setVisible((prevState) => !prevState);
    setErrorVisible(false);
  };

  const onToggleErrorSnackBar = () => {
    setErrorVisible((prevState) => !prevState);
    setVisible(false);
  };

  async function saveItems() {
    try {
      await axios.post("/project", { name, description });
      onToggleSnackBar();
    } catch (error) {
      onToggleErrorSnackBar();
      console.log(error);
    }
  }

  function handleSubmit() {
    saveItems();
    setName("");
    setDescription("");
  }

  return (
    <Container>
      <Card>
        <Title>Projeto</Title>
        <TextInput
          style={{ width: "100%", marginBottom: 10 }}
          selectionColor={Colors.blue500}
          underlineColor={Colors.blue500}
          value={name}
          mode="outlined"
          label="Nome"
          onChangeText={(e) => setName(e)}
        />
        <TextInput
          style={{ width: "100%", marginBottom: 10 }}
          selectionColor={Colors.blue500}
          underlineColor={Colors.blue500}
          value={description}
          mode="outlined"
          label="Description"
          onChangeText={(e) => setDescription(e)}
        />
        <Button
          style={{ marginTop: 30 }}
          icon="content-save"
          mode="contained"
          color="#4169e1"
          onPress={() => handleSubmit()}
        >
          Adicionar
        </Button>
      </Card>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={3000}>
        Projeto adicionado com sucesso!
      </Snackbar>
      <Snackbar
        visible={errorVisible}
        onDismiss={() => setErrorVisible(false)}
        duration={3000}
      >
        Erro ao adicionar projeto.
      </Snackbar>
    </Container>
  );
}