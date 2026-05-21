import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStackNavigator from "./stacks/HomeStackNavigator";
import FavoriteStackNavigator from "./stacks/FavoriteStackNavigator";

// Stack
export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined; // Favorites van ingelogde user meegeven
  Profile: undefined; // User Id van ingelogde user meegeven
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = "home";
          }

          if (route.name === "Favorites") {
            iconName = "heart";
          }

          if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F3A905",
        tabBarInactiveTintColor: "grey",
      })}
    >
      {/* Aanpassen naar HomeStack(Done), FavoritesStack(Done), ProfileStack */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen
        name="Favorites"
        component={FavoriteStackNavigator}
        options={{ headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      ></Tab.Screen>
      {/* Nog een screen toevoegen */}
      {/* Misschien nog in het midden een Plus die een event add toevoegen */}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
