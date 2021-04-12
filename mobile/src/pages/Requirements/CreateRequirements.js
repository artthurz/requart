import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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
      console.log(coords);
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // setImage(result.uri);
      console.log(result);
    }
  };

  const HandleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // setImage(result.uri);
      console.log(result);
    }
  };

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
      await axios.post("/requirements", {
        name,
        description,
        non_functional: true,
        project_id,
        priority_id,
        complexity_id,
        situation_id,
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
    priRef.current.reset();
    comRef.current.reset();
    sitRef.current.reset();
  }

  function handleOpenModal(photo) {
    setImageModalVisible(true);
    setCurrentPhoto(photo);
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.title}>Requisito</Text>
            <View style={{ marginTop: 10, width: "100%" }}>
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
            </View>
            <View style={{ marginTop: 10, width: "100%" }}>
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
            </View>
            <View style={{ marginTop: 10, width: "100%" }}>
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
            </View>
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

            <Text style={{marginTop: 10, fontSize: 20}}>Imagens</Text>

            <View style={{ flexDirection: "row"}}>
              <TouchableOpacity onPress={() => handleOpenModal(1)}>
                <View style={styles.imageStyle}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOpenModal(2)}>
                <View style={styles.imageStyle}></View>
              </TouchableOpacity>
            </View>

            <Button
              icon="content-save"
              mode="contained"
              color="#4169e1"
              onPress={() => handleSubmit()}
            >
              Adicionar
            </Button>
          </View>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
          >
            Projeto adicionado com sucesso!
          </Snackbar>
          <Snackbar
            visible={errorVisible}
            onDismiss={onDismissErrorSnackBar}
            duration={3000}
          >
            Erro ao adicionar projeto.
          </Snackbar>
        </ScrollView>
      </SafeAreaView>
      <Portal>
        <Modal
          visible={imageModalVisible}
          onDismiss={() => setImageModalVisible(false)}
          contentContainerStyle={styles.containerStyle}
          style={styles.modal}
        >
          <View style={styles.containerModal}>
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
              Tirar uma foto
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
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
    marginBottom: 30,
  },
  scrollView: {
    marginHorizontal: 20,
    width: "100%",
  },
  textInput: {
    width: "100%",
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "90%",
    height: 650,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
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
  containerStyle: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderRadius: 20,
  },
  imageStyle: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    borderRadius: 20,
    margin: 20
  },
});
