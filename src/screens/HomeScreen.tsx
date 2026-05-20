import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Modal } from "react-native";
import ActivityCard, { Activity } from "../components/ActivityCard";
import uuid from "react-native-uuid";
import EventForm from "./EventForm";
import { MaterialIcons } from "@expo/vector-icons";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
};

const HomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvent] = useState<Event[]>([
    // Verder werken aan plus knopje voor event toe te voegen.
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
  ]);

  const addEvent = (
    title: string,
    description: string,
    location: string,
    date: string,
    participants: number,
  ) => {
    let newEvent: Event = {
      id: uuid.v4().toString(),
      title: title,
      description: description,
      location: location,
      date: date,
      maxParticipants: participants,
    };

    setEvent((currentEvents) => {
      return [newEvent, ...currentEvents];
    });

    setModalOpen(false);
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
          <EventForm EventFilledIn={addEvent} />
        </View>
      </Modal>
      <Text style={styles.title}>Inschrijvings App</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityCard activity={item} />}
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
});
