import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginStack from "./stacks/LoginStack";
import TabNavigator from "./TabNavigator";

const RootNavigation = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
