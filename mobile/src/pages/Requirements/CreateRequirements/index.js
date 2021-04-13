import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Title,
  Scroll,
  DropDown,
  ImgPreview,
  SelectImageCard,
  Actions,
} from "./styles";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {
  Button,
  TextInput,
  Colors,
  Snackbar,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";

export default function CreateRequirements({ navigation, route }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority_id, setPriority_id] = useState(1);
  const [complexity_id, setComplexity_id] = useState(1);
  const [situation_id, setSituation_id] = useState(1);
  const [location, setLocation] = useState([]);

  const [priorities, setPriorities] = useState([]);
  const [complexities, setComplexities] = useState([]);
  const [situations, setSituations] = useState([]);

  const [currentPhoto, setCurrentPhoto] = useState();

  const [firstPhoto, setFirstPhoto] = useState();
  const [secondPhoto, setSecondPhoto] = useState();

  const priRef = useRef(null);
  const comRef = useRef(null);
  const sitRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const [imageModalVisible, setImageModalVisible] = useState(false);

  const { project_id } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      if (Platform.OS !== "web") {
        const roll = await ImagePicker.requestCameraRollPermissionsAsync();
        const camera = await ImagePicker.requestCameraPermissionsAsync();
        if (roll.status !== "granted" || camera.status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let prioritiesResponse = await axios.get("priorities");
      var variavel = [];
      prioritiesResponse.data.map((e) => {
        variavel.push({ label: e.name, value: e.id });
      });
      setPriorities(variavel);
      variavel = [];
      let complexitiesResponse = await axios.get("complexities");
      complexitiesResponse.data.forEach((e) => {
        variavel.push({ label: e.name, value: e.id });
      });
      setComplexities(variavel);
      variavel = [];
      let situationsResponse = await axios.get("situations");
      situationsResponse.data.forEach((e) => {
        variavel.push({ label: e.name, value: e.id });
      });
      setSituations(variavel);
    })();
  }, []);

  const HandlePickPhoto = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!response.cancelled) {
      let data = new FormData();
      data.append("file", {
        type: "image/jpeg",
        name: `${project_id}.jpg`,
        uri: response.uri,
      });

      const file = await axios.post("requirements/files", data);
      if (currentPhoto === 1) {
        setFirstPhoto(file.data);
      } else {
        setSecondPhoto(file.data);
      }
      setImageModalVisible(false);
    }
  };

  const HandleTakePhoto = async () => {
    let response = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!response.cancelled) {
      let data = new FormData();
      data.append("file", {
        type: "image/jpeg",
        name: `${project_id}.jpg`,
        uri: response.uri,
      });

      const file = await axios.post("requirements/files", data);
      if (currentPhoto === 1) {
        setFirstPhoto(file.data);
      } else {
        setSecondPhoto(file.data);
      }
      setImageModalVisible(false);
    }
  };

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
      await axios.post("/requirements", {
        name,
        description,
        non_functional: true,
        project_id,
        priority_id,
        complexity_id,
        situation_id,
        first_file_id: firstPhoto?.id,
        second_file_id: secondPhoto?.id,
        latitude: location.latitude,
        longitude: location.longitude,
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
    setDescription("");
    setFirstPhoto();
    setSecondPhoto();
  }

  function handleOpenModal(photo) {
    setImageModalVisible(true);
    setCurrentPhoto(photo);
  }

  return (
    <Provider>
      <Container>
        <Scroll>
          <Card>
            <Title>Requisito</Title>
            <DropDown>
              <DropDownPicker
                items={priorities}
                onOpen={() => (comRef.current.close(), sitRef.current.close())}
                controller={(instance) => (priRef.current = instance)}
                placeholder="Selecione uma prioridade"
                containerStyle={{ height: 60, width: "100%" }}
                style={{ backgroundColor: "#fafafa", paddingVertical: 10 }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => setPriority_id(item.value)}
              />
            </DropDown>
            <DropDown>
              <DropDownPicker
                items={complexities}
                onOpen={() => (priRef.current.close(), sitRef.current.close())}
                controller={(instance) => (comRef.current = instance)}
                placeholder="Selecione uma complexidade"
                containerStyle={{ height: 60, width: "100%" }}
                style={{ backgroundColor: "#fafafa", paddingVertical: 10 }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => setComplexity_id(item.value)}
              />
            </DropDown>
            <DropDown>
              <DropDownPicker
                items={situations}
                onOpen={() => (comRef.current.close(), priRef.current.close())}
                controller={(instance) => (sitRef.current = instance)}
                placeholder="Selecione uma situação"
                containerStyle={{ height: 60, width: "100%" }}
                style={{ backgroundColor: "#fafafa", paddingVertical: 10 }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => setSituation_id(item.value)}
              />
            </DropDown>
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
              value={description}
              mode="outlined"
              label="Description"
              onChangeText={(e) => setDescription(e)}
            />

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}>Imagens</Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => handleOpenModal(1)}>
                {firstPhoto ? (
                  <ImgPreview
                    source={{
                      uri: firstPhoto?.url,
                    }}
                  />
                ) : (
                  <SelectImageCard>
                    <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "bold" }}>
                      Selecione
                    </Text>
                  </SelectImageCard>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOpenModal(2)}>
                {secondPhoto ? (
                  <ImgPreview
                    source={{
                      uri: secondPhoto?.url,
                    }}
                  />
                ) : (
                  <SelectImageCard>
                    <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "bold" }}>
                      Selecione
                    </Text>
                  </SelectImageCard>
                )}
              </TouchableOpacity>
            </View>

            <Button
              style={{ marginTop: 30, width: "100%" }}
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
          Requisito adicionado com sucesso!
        </Snackbar>
        <Snackbar
          visible={errorVisible}
          onDismiss={() => setErrorVisible(false)}
          duration={3000}
        >
          Erro ao adicionar requisito.
        </Snackbar>
      </Container>
      <Portal>
        <Modal
          visible={imageModalVisible}
          onDismiss={() => setImageModalVisible(false)}
          contentContainerStyle={styles.containerStyle}
          style={styles.modal}
        >
          <Actions>
            <Button
              style={{ width: "100%" }}
              icon="image"
              mode="contained"
              color="#4169e1"
              onPress={() => HandlePickPhoto()}
            >
              Escolher da galeria
            </Button>
            <Button
              style={{ marginTop: 30, width: "100%" }}
              icon="camera"
              mode="contained"
              color="#4169e1"
              onPress={() => HandleTakePhoto()}
            >
              Usar câmera
            </Button>
          </Actions>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerStyle: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderRadius: 20,
  },
});
