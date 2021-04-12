import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from 'axios'
import { Button, TextInput, Colors, Snackbar } from "react-native-paper";

export default function CreateProjects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const onToggleSnackBar = () => {
    setVisible(!visible);
    setErrorVisible(false);
  };

  const onDismissSnackBar = () => setVisible(false);

  const onToggleErrorSnackBar = () => {
    setErrorVisible(!visible);
    setVisible(false);
  };

  const onDismissErrorSnackBar = () => setErrorVisible(false);

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
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Projeto</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={Colors.blue500}
          underlineColor={Colors.blue500}
          value={name}
          mode="outlined"
          label="Nome"
          onChangeText={(e) => setName(e)}
        />
        <TextInput
          style={styles.textInput}
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
      </View>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>
        Projeto adicionado com sucesso!
      </Snackbar>
      <Snackbar
        visible={errorVisible}
        onDismiss={onDismissErrorSnackBar}
        duration={3000}
      >
        Erro ao adicionar projeto.
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efefef",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#555555",
    marginBottom: 30
  },
  textInput: {
    width: "100%",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "90%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center"
  },
});
