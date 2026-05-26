import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ActivityCard from "../components/ActivityCard";
import { Activity, getActivities } from "../services/activityService";
import { useAppSelector } from "../../store/hooks";
import { selectFavoriteActivityIds } from "../features/favorites/favoritesSlice";

const FavoritesScreen = () => {
  const favoriteActivityIds = useAppSelector(selectFavoriteActivityIds);
  const [favoriteActivities, setFavoriteActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function loadFavoriteActivities() {
      const allActivities = await getActivities();

      const filteredActivities = allActivities.filter((activity) =>
        favoriteActivityIds.includes(activity.id),
      );

      setFavoriteActivities(filteredActivities);
    }

    loadFavoriteActivities();
  }, [favoriteActivityIds]);

  return (
    <View style={styles.container}>
      {favoriteActivities.length === 0 ? (
        <Text>Je hebt nog geen favorieten.</Text>
      ) : (
        <FlatList
          data={favoriteActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ActivityCard activity={item} />}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

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
