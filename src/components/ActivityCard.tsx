import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { Activity } from "../services/activityService";
import { formatFirestoreDate } from "../../utils/formatDate";
import { auth } from "../firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addFavorite,
  removeFavorite,
  selectFavoriteActivityIds,
} from "../features/favorites/favoritesSlice";
import {
  addUserFavorite,
  removeUserFavorite,
} from "../services/favoriteService";

type ActivityCardProps = {
  activity: Activity;
  onToggleParticipation?: (activityId: string, isJoined: boolean) => void;
};

const ActivityCard = ({
  activity,
  onToggleParticipation,
}: ActivityCardProps) => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  const favoriteActivityIds = useAppSelector(selectFavoriteActivityIds);

  const isFavorite = favoriteActivityIds.includes(activity.id);

  const openDetail = () => {
    navigation.navigate("ActivityDetail", { activity });
  };

  const handleToggleFavorite = async () => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      alert("Je moet ingelogd zijn om favorieten te gebruiken.");
      return;
    }

    if (isFavorite) {
      await removeUserFavorite(userId, activity.id);
      dispatch(removeFavorite(activity.id));
    } else {
      await addUserFavorite(userId, activity.id);
      dispatch(addFavorite(activity.id));
    }
  };

  const isFull = activity.currentParticipants >= activity.maxParticipants;
  const isJoined = user ? activity.joinedUserIds.includes(user.uid) : false;

  return (
    <TouchableOpacity onPress={openDetail} activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.cardTitle}>{activity.title}</Text>

          <Pressable onPress={handleToggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite ? "red" : "#6B7280"}
            />
          </Pressable>
        </View>

        <Text style={styles.description}>{activity.description}</Text>

        <Text style={styles.info}>📍 {activity.location}</Text>
        <Text style={styles.info}>📅 {formatFirestoreDate(activity.date)}</Text>

        <Text style={styles.info}>
          👥 {activity.currentParticipants} / {activity.maxParticipants}{" "}
          deelnemers
        </Text>

        {onToggleParticipation && (
          <Pressable
            style={[
              styles.joinButton,
              isFull && !isJoined && styles.disabledButton,
            ]}
            onPress={() => onToggleParticipation(activity.id, isJoined)}
            disabled={isFull && !isJoined}
          >
            <Text style={styles.joinButtonText}>
              {isFull && !isJoined ? "Volzet" : isJoined ? "Leave" : "Join"}
            </Text>
          </Pressable>
        )}
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
  joinButton: {
    marginTop: 12,
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  joinButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
