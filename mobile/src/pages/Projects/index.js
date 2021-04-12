import React, { useState, useCallback } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import {
  IconButton,
  Colors,
  Modal,
  Portal,
  Provider,
  Button,
  TextInput,
} from "react-native-paper";
import axios from 'axios'

export default function Projects({ navigation }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner_id, setOwner_id] = useState();
  const [delivery_date, setDelivery_date] = useState();
  const [projects, setProjects] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);

  function showModal(item) {
    console.log(item);
    setEditModalVisible(true);
    setId(item.id);
    setName(item.name);
    setDescription(item.description);
  }
  const hideEditModal = () => setEditModalVisible(false);

  async function loadProjects() {
    try {
      const response = await axios.get("projects");
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProject(id) {
    try {
      await axios.delete(`/projects/${id}`);
      loadProjects();
    } catch (error) {
      console.log(error);
    }
  }

  async function editProject() {
    try {
      await axios.put(`/projects/${id}`, { name, description, owner_id, delivery_date });
      loadProjects();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditProjectSubmit() {
    editProject();
    hideEditModal();
  }

  useFocusEffect(
    useCallback(() => {
      loadProjects();
    }, [])
  );

  const renderProjects = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Requisitos", {
        project_id: item.id,
      })}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.messageTitle}>{item.name}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={styles.dateStyle}>Responsável: </Text>
          <Text style={styles.descriptionStyle}>{item.owner.name}</Text>
        </View>
        <View style={{alignItems: "center", justifyContent: "center", backgroundColor: "transparent", marginBottom: 20}}>
        <View style={{alignItems: "center", justifyContent: "center", backgroundColor: item.status ? "#3ca419" : "#e14169", borderRadius: 20, width: 150, padding: 10}}>
          <Text style={styles.tagStyle}>{item.status ? "Em andamento" : "Finalizado"}</Text>
        </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
          }}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.dateStyle}>Entrega estimada</Text>
            <Text style={styles.dateStyle}>
              {moment(item.delivery_date).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.dateStyle}>Data de Criação</Text>
            <Text style={styles.dateStyle}>
              {moment(item.created_at).format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.buttonsContainer}>
            <IconButton
              icon="square-edit-outline"
              style={{backgroundColor: "#fff"}}
              color={Colors.blue500}
              size={25}
              onPress={() => showModal(item)}
            />
            <IconButton
              icon="trash-can-outline"
              style={{backgroundColor: "#fff"}}
              color={Colors.red500}
              size={25}
              onPress={() => deleteProject(item.id)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={projects}
          renderItem={renderProjects}
          keyExtractor={(item) => item.id.toString()}
        />
        <IconButton
          style={{width: 60,  
            height: 60,   
            borderRadius: 30,            
            backgroundColor: '#3ca419',                                    
            position: 'absolute',                                          
            bottom: 10,                                                    
            right: 10, }}
          icon="plus"
          onPress={() => navigation.navigate("Criar Projeto")}
          size={20}
          color={"white"}
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
                style={{ marginTop: 30 }}
                color={Colors.blue500}
                icon="content-save"
                onPress={() => handleEditProjectSubmit()}
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
    backgroundColor: "white"
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 100,
    marginTop: 30,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff"
  },
  messageSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
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
  subContainer: {
    marginTop: 20,
    backgroundColor: "transparent"
  },
  contentContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  descriptionStyle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#fff"
  },
  tagStyle: {
    fontSize: 16,
    color: "#fff"
  },
  dateStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  },
  card: {
    backgroundColor: "#4169e1",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: "#fff",
  },
});
