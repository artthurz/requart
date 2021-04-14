import React, { useState, useContext } from "react";
import axios from "axios";
import DateInput from "../../../components/DateInput";
import { Button, TextInput, Colors, Snackbar } from "react-native-paper";
import { Container, Card, Title, InputTitle } from "./styles";
import AuthContext from "../../../contexts/auth";

export default function CreateProjects() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [link, setLink] = useState("");

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
      await axios.post("/projects", {
        name,
        description,
        owner_id: user.id,
        delivery_date: deliveryDate,
        link,
      });
      onToggleSnackBar();
      setName("");
      setDescription("");
      setLink("");
    } catch (error) {
      onToggleErrorSnackBar();
      console.log(error);
    }
  }

  function handleSubmit() {
    saveItems();
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
        <TextInput
          style={{ width: "100%", marginBottom: 10 }}
          selectionColor={Colors.blue500}
          underlineColor={Colors.blue500}
          value={link}
          mode="outlined"
          label="Link"
          onChangeText={(e) => setLink(e)}
        />
        <InputTitle>Data de entrega prevista</InputTitle>
        <DateInput date={deliveryDate} onChange={setDeliveryDate} />
        <Button
          style={{
            height: 60,
            alignSelf: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 30,
          }}
          labelStyle={{ textTransform: "none" }}
          icon="content-save"
          mode="contained"
          color="#4169e1"
          onPress={() => handleSubmit()}
        >
          Adicionar
        </Button>
      </Card>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
      >
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
