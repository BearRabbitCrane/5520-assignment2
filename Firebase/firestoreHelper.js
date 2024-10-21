import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { database } from './firebaseSetup'; // Import Firestore database setup

// Function to fetch all documents in the 'activities' collection
export async function fetchActivities() {
  try {
    const querySnapshot = await getDocs(collection(database, 'activities'));
    const activities = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return activities;
  } catch (error) {
    console.error('Error fetching activities: ', error);
    throw error;
  }
}

// Function to add a new activity
export async function addActivityToDB(activityData) {
  try {
    const docRef = await addDoc(collection(database, 'activities'), activityData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding activity: ', error);
    throw error;
  }
}

// Function to delete an activity
export async function deleteActivityFromDB(activityId) {
  try {
    await deleteDoc(doc(database, 'activities', activityId));
  } catch (error) {
    console.error('Error deleting activity: ', error);
    throw error;
  }
}

// Function to listen to real-time updates in Firestore
export async function listenToActivities(callback) {
  try {
    const unsubscribe = onSnapshot(collection(database, 'activities'), (snapshot) => {
      const activities = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(activities); // Pass the activities data to the callback function
    });
    return unsubscribe; // Return the unsubscribe function to stop listening when no longer needed
  } catch (error) {
    console.error('Error listening to activities: ', error);
    throw error;
  }
}
