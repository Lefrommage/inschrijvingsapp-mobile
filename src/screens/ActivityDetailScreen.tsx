import { StyleSheet, Text, View } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../navigation/stacks/HomeStackNavigator";

type Props = NativeStackScreenProps<HomeStackParamList, "ActivityDetail">;

const ActivityDetailScreen = ({ route }: Props) => {
  const { activity } = route.params;

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text>Geen activiteit geladen.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.description}>{activity.description}</Text>
      <Text style={styles.info}>📍 {activity.location}</Text>

      <Text style={styles.info}>
        📅{" "}
        {activity.date.toDate().toLocaleString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>

      <Text style={styles.info}>
        👥 Max {activity.maxParticipants} deelnemers
      </Text>
    </View>
  );
};

export default ActivityDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111827",
  },
  description: { fontSize: 16, color: "#374151", marginBottom: 12 },
  info: { fontSize: 14, color: "#4B5563", marginBottom: 6 },
});
