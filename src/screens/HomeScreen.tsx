import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ActivityCard, { Activity } from "../components/ActivityCard";

const activities: Activity[] = [
  {
    id: "1",
    title: "Voetbalavond",
    description: "Samen voetballen in Gent.",
    location: "Gent",
    date: "2026-05-20",
    maxParticipants: 12,
  },
  {
    id: "2",
    title: "Boardgame Night",
    description: "Gezellige avond met gezelschapsspellen.",
    location: "HoGent",
    date: "2026-05-25",
    maxParticipants: 8,
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inschrijvings App</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityCard activity={item} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },
});
