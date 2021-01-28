import React from "react";
import { View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SigninScreen from "./src/screens/SigninScreen";
import AddItem from "./src/screens/AddItem";
import EditItem from "./src/screens/EditItem";
import Categories from "./src/screens/Categories";
import Home from "./src/screens/Home";
import { Provider as MenuProvider } from "react-native-paper";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ExpiredProvider } from "./src/context/ExpiredContext";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { setNavigator } from "./src/navigationRef";
import Icon from "react-native-vector-icons/FontAwesome";

const categories = createStackNavigator({
  Categories: Categories,
});

const homeList = createStackNavigator({
  Home: Home,
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  addDetail: createStackNavigator({
    AddItem: AddItem,
    EditItem: EditItem,
  }),
  mainFlow: createBottomTabNavigator({
    //homeList,
    //Home: Home,
    homeList: {
      screen: homeList,
      navigationOptions: {
        title: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color="#900" />
        ),
      },
    },
    categories: {
      screen: categories,
      navigationOptions: {
        title: " Categories",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="tasks" size={30} color="#900" />
        ),
      },
    },
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <ExpiredProvider>
      <AuthProvider>
        <MenuProvider>
          <App ref={(navigator) => setNavigator(navigator)} />
        </MenuProvider>
      </AuthProvider>
    </ExpiredProvider>
  );
};
