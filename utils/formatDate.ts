import { Timestamp } from "firebase/firestore";

export function formatFirestoreDate(date: Timestamp): string {
  return date.toDate().toLocaleString("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
