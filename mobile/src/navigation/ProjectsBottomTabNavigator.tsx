import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { IconButton } from "react-native-paper";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Projects from "../screens/CreateProject";
import ViewProjects from "../screens/Projects";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function ProjectsBottomTabNavigator({navigation}) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Projetos"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Projetos"
        component={viewProjects}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Criar"
        component={createProjects}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="add-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CreateProject = createStackNavigator<TabOneParamList>();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#4169e1",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

function createProjects({navigation}) {
  return (
    <CreateProject.Navigator screenOptions={screenOptionStyle}>
      <CreateProject.Screen
        name="Projects"
        component={Projects}
        options={{
          headerTitle: "Criar Projeto",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={ screenOptionStyle.headerTintColor }
            />
          ),
        }}
      />
    </CreateProject.Navigator>
  );
}

const ViewProject = createStackNavigator<TabTwoParamList>();

function viewProjects({navigation}) {
  return (
    <ViewProject.Navigator screenOptions={screenOptionStyle}>
      <ViewProject.Screen
        name="ViewProjects"
        component={ViewProjects}
        options={{
          headerTitle: "Projetos",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={ screenOptionStyle.headerTintColor }
            />
          ),
        }}
      />
    </ViewProject.Navigator>
  );
}
