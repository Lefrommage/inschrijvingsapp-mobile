import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import ActivityCard from "../components/ActivityCard";
import EventForm from "./EventForm";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import {
  Activity,
  getActivities,
  addActivity,
  joinActivity,
  leaveActivity,
} from "../services/activityService";
import { useAppDispatch } from "../../store/hooks";
import {
  setFavorites,
  clearFavorites,
} from "../features/favorites/favoritesSlice";
import { getUserFavoriteIds } from "../services/favoriteService";

const HomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<Activity[]>([]);
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  async function loadActivities() {
    const activitiesFromDatabase = await getActivities();
    setEvents(activitiesFromDatabase);
  }

  async function loadFavorites() {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      dispatch(clearFavorites());
      return;
    }

    const favoriteIds = await getUserFavoriteIds(userId);
    dispatch(setFavorites(favoriteIds));
  }

  useEffect(() => {
    loadActivities();
    loadFavorites();
  }, []);

  const handleAddEvent = async (
    title: string,
    description: string,
    location: string,
    date: Date,
    participants: number,
  ) => {
    await addActivity(title, description, location, date, participants);
    await loadActivities();
    setModalOpen(false);
  };

  const handleToggleParticipation = async (
    activityId: string,
    isJoined: boolean,
  ) => {
    try {
      if (!user) {
        alert("Je moet ingelogd zijn om deel te nemen.");
        return;
      }

      if (isJoined) {
        await leaveActivity(activityId, user.uid);
      } else {
        await joinActivity(activityId, user.uid);
      }

      await loadActivities();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Actie mislukt.");
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalOpen}>
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={28}
            style={styles.modalClose}
            onPress={() => setModalOpen(false)}
          />

          <EventForm EventFilledIn={handleAddEvent} />
        </View>
      </Modal>

      <View style={styles.header}>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onToggleParticipation={handleToggleParticipation}
          />
        )}
      />

      <MaterialIcons
        name="add"
        size={32}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
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
  modalToggle: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#f4511e",
    color: "white",
    padding: 14,
    borderRadius: 30,
    elevation: 5,
    zIndex: 1,
  },
  modalClose: {
    alignSelf: "center",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
