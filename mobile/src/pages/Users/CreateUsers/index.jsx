import React, { useState } from "react";
import { Container, Card, Title, Scroll } from "./styles";
import { Switch, Text } from "react-native";
import axios from "axios";
import {
  Button,
  TextInput,
  Colors,
  Snackbar,
  Provider,
} from "react-native-paper";

export default function CreateUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [admin, setAdmin] = useState(false);

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
      await axios.post("/users", {
        name,
        email,
        login,
        password,
        passwordConfirmation,
        admin,
      });
      onToggleSnackBar();
    } catch (error) {
      onToggleErrorSnackBar();
      console.log(error);
    }
  }

  function handleSubmit() {
    saveItems();
    setName("");
    setEmail("");
    setLogin("");
    setPassword("");
    setPasswordConfirmation("");
    setAdmin(false);
  }

  return (
    <Provider>
      <Container>
        <Scroll>
          <Card>
            <Title>Usuários</Title>
            <TextInput
              style={{ width: "100%", marginTop: 10 }}
              selectionColor={Colors.blue500}
              underlineColor={Colors.blue500}
              value={name}
              mode="outlined"
              label="Nome"
              onChangeText={(e) => setName(e)}
            />
            <TextInput
              style={{ width: "100%", marginTop: 10 }}
              selectionColor={Colors.blue500}
              underlineColor={Colors.blue500}
              value={email}
              mode="outlined"
              label="Email"
              onChangeText={(e) => setEmail(e)}
            />
            <TextInput
              style={{ width: "100%", marginTop: 10 }}
              selectionColor={Colors.blue500}
              underlineColor={Colors.blue500}
              value={login}
              mode="outlined"
              label="Login"
              onChangeText={(e) => setLogin(e)}
            />
            <TextInput
              secureTextEntry
              style={{ width: "100%", marginTop: 10 }}
              selectionColor={Colors.blue500}
              underlineColor={Colors.blue500}
              value={password}
              mode="outlined"
              label="Senha"
              onChangeText={(e) => setPassword(e)}
            />
            <TextInput
              secureTextEntry
              style={{ width: "100%", marginTop: 10 }}
              selectionColor={Colors.blue500}
              underlineColor={Colors.blue500}
              value={passwordConfirmation}
              a
              mode="outlined"
              label="Confirme sua senha"
              onChangeText={(e) => setPasswordConfirmation(e)}
            />
            <Text style={{marginTop: 10, fontWeight: "bold"}}>Administrador</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#3ca419" }}
              thumbColor={admin ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setAdmin((prevState) => !prevState)}
              value={admin}
            />

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
        </Scroll>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
        >
          Usuário cadastrado com sucesso!
        </Snackbar>
        <Snackbar
          visible={errorVisible}
          onDismiss={() => setErrorVisible(false)}
          duration={3000}
        >
          Erro ao adicionar usuário.
        </Snackbar>
      </Container>
    </Provider>
  );
}
