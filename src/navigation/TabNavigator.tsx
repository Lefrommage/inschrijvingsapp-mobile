import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStackNavigator from "./stacks/HomeStackNavigator";
import FavoriteStackNavigator from "./stacks/FavoriteStackNavigator";
import ProfileStackNavigator from "./stacks/ProfileStackNavigator";

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
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
