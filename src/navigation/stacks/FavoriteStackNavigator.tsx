import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../../screens/FavoritesScreen";
import ActivityDetailScreen from "../../screens/ActivityDetailScreen";
import type { Activity } from "../../services/activityService";

export type FavoriteStackParamList = {
  FavoritesScreen: undefined;
  ActivityDetail: { activity: Activity };
};

const FavoriteStack = createNativeStackNavigator<FavoriteStackParamList>();

const FavoriteStackNavigator = () => {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
      />
      <FavoriteStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ title: "Activiteit" }}
      />
    </FavoriteStack.Navigator>
  );
};

export default FavoriteStackNavigator;

const styles = StyleSheet.create({});
