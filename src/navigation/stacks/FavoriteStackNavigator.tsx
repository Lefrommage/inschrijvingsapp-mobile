import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../../screens/FavoritesScreen";
import HomeScreen from "../../screens/HomeScreen";

export type FavoriteStackParamList = {
  FavoritesScreen: undefined;
  // Andere page's toevoegen
};

const FavoriteStack = createNativeStackNavigator<FavoriteStackParamList>();

const FavoriteStackNavigator = () => {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
      />
    </FavoriteStack.Navigator>
  );
};

export default FavoriteStackNavigator;

const styles = StyleSheet.create({});
