import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";

export type LoginStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  LoginStackParamList,
  "LoginScreen"
>;

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;

const styles = StyleSheet.create({});
