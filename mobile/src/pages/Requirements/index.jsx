import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  IconButton,
  Colors,
  Modal,
  Portal,
  Provider,
  Button,
  TextInput,
} from "react-native-paper";
import axios from "axios";
import { Card, CardBackground } from "./styles";

export default function Requirements({ navigation, route }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner_id, setOwner_id] = useState();
  const [delivery_date, setDelivery_date] = useState();
  const [requirements, setRequirements] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { project_id } = route.params;

  function showModal(item) {
    setEditModalVisible(true);
    setId(item.id);
    setName(item.name);
    setDescription(item.description);
  }
  const hideEditModal = () => setEditModalVisible(false);

  async function loadRequirements() {
    try {
      const response = await axios.get(`requirements/${project_id}`);
      setRequirements(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteRequirement(id) {
    try {
      await axios.delete(`/requirements/${id}`);
      loadRequirements();
    } catch (error) {
      console.log(error);
    }
  }

  async function editRequirement() {
    try {
      await axios.put(`/requirements/${id}`, {
        name,
        description,
        owner_id,
        delivery_date,
      });
      loadRequirements();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditRequirementSubmit() {
    editRequirement();
    hideEditModal();
  }

  useFocusEffect(
    useCallback(() => {
      loadRequirements();
    }, [])
  );

  const rederItem = ({ item }) => (
    <Card activeOpacity={0.8}>
      <CardBackground colors={["#4169e1", "#214cce"]}>
        <View style={styles.cardHeader}>
          <View style={styles.contentEnveloper}>
            <Text style={styles.messageTitle}>
              {item.non_functional ? "RNF" : "RF"}
            </Text>
            <Text style={styles.messageTitle}>
              {`${item.requirement_id} - `}
            </Text>
            <Text style={styles.messageTitle}>{item.name}</Text>
          </View>
          <View style={styles.contentEnveloper}>
            <Text style={styles.messageSubTitle}>{"Versão "}</Text>
            <Text style={styles.messageSubTitle}>{item.version}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardsEnveloper}>
            <View style={styles.contentEnveloper}>
              <Text style={styles.messageSubTitle}>{"Prioridade "}</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: item.priority.color,
                  borderRadius: 20,
                  width: 150,
                  padding: 10,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Text style={styles.tagStyle}>{item.priority.name}</Text>
              </View>
            </View>
            <View style={styles.contentEnveloper}>
              <Text style={styles.messageSubTitle}>{"Complexidade "}</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: item.complexity.color,
                  borderRadius: 20,
                  width: 150,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={styles.tagStyle}>{item.complexity.name}</Text>
              </View>
            </View>
            <View style={styles.contentEnveloper}>
              <Text style={styles.messageSubTitle}>{"Situação "}</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: item.situation.color,
                  borderRadius: 20,
                  width: 150,
                  padding: 10,
                }}
              >
                <Text style={styles.tagStyle}>{item.situation.name}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "transparent",
            }}
          />
          <View style={styles.contentContainer}>
            <View style={styles.cardFooter}>
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
                onPress={() => deleteRequirement(item.id)}
              />
            </View>
          </View>
        </View>
      </CardBackground>
    </Card>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={requirements}
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
            navigation.navigate("Criar Requisito", {
              project_id,
            })
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
                onPress={() => handleEditRequirementSubmit()}
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
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 100,
    marginTop: 30,
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
