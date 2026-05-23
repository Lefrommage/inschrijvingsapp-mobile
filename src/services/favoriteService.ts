import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getUserFavoriteIds(userId: string): Promise<string[]> {
  const favoritesRef = collection(db, "users", userId, "favorites");
  const snapshot = await getDocs(favoritesRef);

  return snapshot.docs.map((document) => document.id);
}

export async function addUserFavorite(userId: string, activityId: string) {
  const favoriteRef = doc(db, "users", userId, "favorites", activityId);

  await setDoc(favoriteRef, {
    activityId,
    createdAt: serverTimestamp(),
  });
}

export async function removeUserFavorite(userId: string, activityId: string) {
  const favoriteRef = doc(db, "users", userId, "favorites", activityId);

  await deleteDoc(favoriteRef);
}
