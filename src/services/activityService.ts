import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  doc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase";

export type Activity = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Timestamp;
  maxParticipants: number;
  currentParticipants: number;
  joinedUserIds: string[];
};

export async function getActivities(): Promise<Activity[]> {
  const snapshot = await getDocs(collection(db, "activities"));

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date,
      maxParticipants: data.maxParticipants,
      currentParticipants: data.currentParticipants,
      joinedUserIds: data.joinedUserIds ?? [],
    };
  });
}

export async function addActivity(
  title: string,
  description: string,
  location: string,
  date: Date,
  maxParticipants: number,
) {
  await addDoc(collection(db, "activities"), {
    title,
    description,
    location,
    date: Timestamp.fromDate(date),
    maxParticipants,
    currentParticipants: 0,
    joinedUserIds: [],
  });
}

export async function joinActivity(activityId: string, userId: string) {
  const activityRef = doc(db, "activities", activityId);

  await runTransaction(db, async (transaction) => {
    const activitySnapshot = await transaction.get(activityRef);

    if (!activitySnapshot.exists()) {
      throw new Error("Activiteit bestaat niet.");
    }

    const activityData = activitySnapshot.data();

    const currentParticipants = activityData.currentParticipants ?? 0;
    const maxParticipants = activityData.maxParticipants ?? 0;
    const joinedUserIds = activityData.joinedUserIds ?? [];

    if (joinedUserIds.includes(userId)) {
      throw new Error("Je bent al ingeschreven voor deze activiteit.");
    }

    if (currentParticipants >= maxParticipants) {
      throw new Error("Deze activiteit zit vol.");
    }

    transaction.update(activityRef, {
      currentParticipants: currentParticipants + 1,
      joinedUserIds: [...joinedUserIds, userId],
    });
  });
}

export async function leaveActivity(activityId: string, userId: string) {
  const activityRef = doc(db, "activities", activityId);

  await runTransaction(db, async (transaction) => {
    const activitySnapshot = await transaction.get(activityRef);

    if (!activitySnapshot.exists()) {
      throw new Error("Activiteit bestaat niet.");
    }

    const activityData = activitySnapshot.data();
    const currentParticipants = activityData.currentParticipants ?? 0;
    const joinedUserIds = activityData.joinedUserIds ?? [];

    if (!joinedUserIds.includes(userId)) {
      throw new Error("Je bent niet ingeschreven voor deze activiteit.");
    }

    transaction.update(activityRef, {
      currentParticipants: Math.max(currentParticipants - 1, 0),
      joinedUserIds: joinedUserIds.filter(
        (joinedUserId: string) => joinedUserId !== userId,
      ),
    });
  });
}
