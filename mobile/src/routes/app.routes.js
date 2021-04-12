import React, { useContext } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import AuthContext from "../contexts/auth";

import Home from "../pages/Home";
import CreateProjects from "../pages/Projects/CreateProjects";
import Projects from "../pages/Projects";
import CreateRequirements from "../pages/Requirements/CreateRequirements";
import Requirements from "../pages/Requirements";
import { IconButton } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();

const AppRoutes = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: "#0a0742",
        width: 200,
      }}
      drawerContentOptions={{
        activeTintColor: "#FE5200",
        inactiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} options={{
          drawerIcon: (config) => (
            <Icon
              size={23}
              color="#fff"
              name={Platform.OS === "android" ? "home" : "home"}
            ></Icon>
          ),
        }}/>
      <Drawer.Screen name="Projetos" component={ProjectsStackNavigator} options={{
          drawerIcon: (config) => (
            <Icon
              size={23}
              color="#fff"
              name={Platform.OS === "android" ? "format-list-bulleted-square" : "format-list-bulleted-square"}
            ></Icon>
          ),
        }}/>
      <Drawer.Screen
        name="Sair"
        component={Exit}
        options={{
          drawerIcon: (config) => (
            <Icon
              size={23}
              color="#fff"
              name={Platform.OS === "android" ? "exit-to-app" : "exit-to-app"}
            ></Icon>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#0a0742",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const Exit = () => {
  const { signOut } = useContext(AuthContext);
  signOut();
  return <></>;
};

const ProjectsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Projetos"
        component={Projects}
        options={{
          headerTitle: "Projetos",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={screenOptionStyle.headerTintColor}
            />
          ),
        }}
      />
      <Stack.Screen name="Criar Projeto" component={CreateProjects} />
      <Stack.Screen name="Requisitos" component={Requirements} />
      <Stack.Screen name="Criar Requisito" component={CreateRequirements} />
    </Stack.Navigator>
  );
};

const HomeStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Home",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={screenOptionStyle.headerTintColor}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
