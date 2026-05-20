import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export type Activity = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
};

type ActivityCardProps = {
  activity: Activity;
};

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const navigation = useNavigation<any>();

  const openDetail = () => {
    navigation.navigate("ActivityDetail", { activity });
  };

  return (
    <TouchableOpacity onPress={openDetail} activeOpacity={0.8}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{activity.title}</Text>
        <Text style={styles.description}>{activity.description}</Text>

        <Text style={styles.info}>📍 {activity.location}</Text>
        <Text style={styles.info}>📅 {activity.date}</Text>
        <Text style={styles.info}>
          👥 Max {activity.maxParticipants} deelnemers
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: "#6366F1",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
});
