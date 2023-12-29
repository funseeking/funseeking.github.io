import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth, firestore } from "./Firebase";

export async function LeaveGame(currentUser) {
  if (currentUser) {
    const uid = currentUser.uid;

    // Reference to the user's document in the "users" collection
    const userDocRef = firestore.collection("users").doc(uid);

    // Delete the user's document
    try {
      await userDocRef.delete();
      console.log("User document deleted successfully");
    } catch (error) {
      console.error("Error deleting user document:", error);
    }
  }
}
