import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import CreateProject from "../screens/CreateProject";
import Projects from "../screens/Projects";
import { IconButton } from "react-native-paper";
import Requirements from "../screens/Requirements";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#4169e1",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const ProjectsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Projetos" component={Projects} options={{
          headerTitle: "Projetos",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={screenOptionStyle.headerTintColor}
            />
          ),
        }} />
      <Stack.Screen name="Criar Projeto" component={CreateProject} />
      <Stack.Screen name="Requisitos" component={Requirements} />
    </Stack.Navigator>
  );
};

const HomeStackNavigator = ({navigation}) => {
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

export { ProjectsStackNavigator, HomeStackNavigator };
