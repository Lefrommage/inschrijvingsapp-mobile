import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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
  const [isFavorite, setIsFavorite] = useState(false);

  const openDetail = () => {
    navigation.navigate("ActivityDetail", { activity });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={openDetail} activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.cardTitle}>{activity.title}</Text>

          <Pressable onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite ? "red" : "#6B7280"}
            />
          </Pressable>
        </View>

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: "JimNightshade-Regular",
    fontWeight: "600",
    color: "#4F46E5",
    marginBottom: 8,
    flex: 1,
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
