import React, { useState, useCallback } from "react";
import axios from "axios";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import RandomGradient from "../../components/RandomGradiant";
import {
  IconButton,
  Colors,
  Modal,
  Portal,
  Provider,
  Button,
  TextInput,
} from "react-native-paper";
import {
  Card,
  CardBackground,
  CardName,
  Avatar,
  CardEmail,
  CardRole,
  CardButtons,
  CardDetails,
  CardRoleText
} from "./styles";

export default function Users({ navigation, route }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner_id, setOwner_id] = useState();
  const [delivery_date, setDelivery_date] = useState();
  const [users, setUsers] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);

  function showModal(item) {
    setEditModalVisible(true);
    setId(item.id);
    setName(item.name);
    setDescription(item.description);
  }
  const hideEditModal = () => setEditModalVisible(false);

  const fetchUsers = async () => {
    const { data } = await axios.get("users");
    setUsers(data);
  };

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`users/${id}`);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };
   
  async function editUser() {
    try {
      await axios.put(`/users/${id}`, {
        name,
        description,
        owner_id,
        delivery_date,
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditUserSubmit() {
    editUser();
    hideEditModal();
  }

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const rederItem = ({ item }) => (
    <Card activeOpacity={0.8}>
      <CardBackground colors={RandomGradient("rainbow")} start={[0, 1]} end={[1, 0]}>
        <Avatar
          source={{
            uri: item.avatar.url,
          }}
        />
        <CardDetails>
          <CardName>{item.name}</CardName>
          <CardEmail>{item?.email}</CardEmail>
          <CardRole><CardRoleText>{item.admin ? "Administrador" : "User"}</CardRoleText></CardRole>
        </CardDetails>
        <CardButtons>
          <IconButton
            icon="square-edit-outline"
            style={{ backgroundColor: "#fff" }}
            color={Colors.blue500}
            size={25}
            onPress={() => showModal(item)}
          />
          <IconButton
            icon="trash-can-outline"
            style={{ backgroundColor: "#fff" }}
            color={Colors.red500}
            size={25}
            onPress={() => handleUserDelete(item.id)}
          />
        </CardButtons>
      </CardBackground>
    </Card>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={users}
          renderItem={rederItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <IconButton
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#3ca419",
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
          icon="plus"
          onPress={() =>
            navigation.navigate("Criar Usuários")
          }
          size={20}
          color="white"
        />
        <Portal>
          <Modal
            visible={editModalVisible}
            onDismiss={hideEditModal}
            contentContainerStyle={styles.containerStyle}
            style={styles.modal}
          >
            <View style={styles.containerModal}>
              <Text style={styles.title}>Editar Projeto</Text>
              <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
              <TextInput
                style={styles.textInput}
                value={name}
                mode="outlined"
                label="Nome"
                onChangeText={(n) => setName(n)}
              />
              <TextInput
                style={styles.textInput}
                value={description.toString()}
                mode="outlined"
                label="Description"
                onChangeText={(d) => setDescription(d)}
              />
              <TextInput
                style={styles.textInput}
                value={description.toString()}
                mode="outlined"
                label="Description"
                onChangeText={(d) => setDescription(d)}
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
                color={Colors.blue500}
                icon="content-save"
                onPress={() => handleEditUserSubmit()}
              >
                Salvar
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderRadius: 20,
  },
  containerModal: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 20,
    width: "125%",
    backgroundColor: "white",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  messageSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  message: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  list: {
    marginTop: 10,
    width: "90%",
  },
  textInput: {
    width: "100%",
    marginBottom: 10,
  },
  cardBody: {
    marginTop: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  descriptionStyle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#fff",
  },
  tagStyle: {
    fontSize: 16,
    color: "#fff",
  },
  dateStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  contentEnveloper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    maxWidth: "80%",
  },
  cardsEnveloper: {
    backgroundColor: "transparent",
    maxWidth: "100%",
  },
});
