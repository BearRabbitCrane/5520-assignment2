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
    return docRef.id; // Return the generated document ID
  } catch (error) {
    console.error('Error adding activity:', error);
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
export function listenToActivities(callback) {
  try {
    const activitiesCollectionRef = collection(database, 'activities'); // Reference to activities collection
    const unsubscribe = onSnapshot(activitiesCollectionRef, (snapshot) => {
      const activities = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(activities); // Pass the activities data to the callback function
    });
    return unsubscribe; // Return the unsubscribe function
  } catch (error) {
    console.error('Error listening to activities: ', error);
    throw error;
  }
}

export async function updateActivityInDB(activityId, updatedData) {
  try {
    const activityRef = doc(database, 'activities', activityId);
    await updateDoc(activityRef, updatedData);
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
}

// Function to fetch all documents in the 'dietEntries' collection
export async function fetchDietEntries() {
  try {
    const querySnapshot = await getDocs(collection(database, 'dietEntries'));
    const dietEntries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dietEntries;
  } catch (error) {
    console.error('Error fetching diet entries: ', error);
    throw error;
  }
}

// Function to add a new diet entry
export async function addDietEntryToDB(dietData) {
  try {
    const docRef = await addDoc(collection(database, 'dietEntries'), dietData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding diet entry: ', error);
    throw error;
  }
}

// Function to delete a diet entry
export async function deleteDietEntryFromDB(entryId) {
  try {
    await deleteDoc(doc(database, 'diet', entryId));
  } catch (error) {
    console.error('Error deleting diet entry: ', error);
    throw error;
  }
}

// Function to listen to real-time updates in Firestore for diet entries
export function listenToDietEntries(callback) {
  const collectionRef = collection(database, 'dietEntries');
  
  // Set up real-time listener with onSnapshot
  return onSnapshot(collectionRef, (snapshot) => {
    const dietEntries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Fetched diet entries:', dietEntries);  // Log fetched data
    callback(dietEntries); // Pass the diet entries data to the callback function
  });
}
