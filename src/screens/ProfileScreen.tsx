import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../firebase";
import { sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const ProfileScreen = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName(user?.displayName ?? "");
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert(
        "Fout",
        error instanceof Error ? error.message : "Uitloggen mislukt.",
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Accountgegevens</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>E-mail</Text>
          <Text style={styles.infoValue}>{user?.email ?? "Onbekend"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gebruikers-ID</Text>
          <Text style={styles.infoValueSmall}>{user?.uid ?? "Onbekend"}</Text>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Uitloggen</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },
  infoValueSmall: {
    fontSize: 13,
    color: "#374151",
  },
  primaryButton: {
    backgroundColor: "#F3A905",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },

  logoutButton: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#B91C1C",
    fontWeight: "800",
    fontSize: 15,
  },
});
