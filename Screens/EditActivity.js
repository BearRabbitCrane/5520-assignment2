import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { updateActivityInDB } from '../Firebase/firestoreHelper';
import commonStyles from '../Helpers/styles';

const EditActivity = ({ route, navigation }) => {
  const { activity } = route.params;
  const [activityType, setActivityType] = useState(activity.activityType);
  const [duration, setDuration] = useState(activity.duration);

  const handleUpdate = async () => {
    if (!activityType || duration <= 0) {
      Alert.alert('Invalid input', 'Please provide valid activity details.');
      return;
    }

    try {
      await updateActivityInDB(activity.id, { activityType, duration });
      Alert.alert('Success', 'Activity updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update activity.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={activityType}
        onChangeText={setActivityType}
        placeholder="Activity Type"
      />
      <TextInput
        style={styles.input}
        value={duration.toString()}
        onChangeText={(val) => setDuration(parseInt(val))}
        placeholder="Duration (min)"
        keyboardType="numeric"
      />
      {/* Replacing Button with Pressable */}
      <Pressable
        onPress={handleUpdate}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? commonStyles.secondaryColor : commonStyles.primaryColor,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
          },
        ]}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: commonStyles.primaryColor,
    borderRadius: 5,
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditActivity;
