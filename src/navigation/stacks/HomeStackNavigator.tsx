import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityDetailScreen from "../../screens/ActivityDetailScreen";
import type { Activity } from "../../components/ActivityCard";
import HomeScreen from "../../screens/HomeScreen";

export type HomeStackParamList = {
  HomePage: undefined;
  ActivityDetail: { activity: Activity };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomePage" component={HomeScreen} />
      <HomeStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ title: "Activiteit" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
