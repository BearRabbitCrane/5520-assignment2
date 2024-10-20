import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const PressableButton = ({ title, onPress, type = 'primary' }) => {
  const isPrimary = type === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        pressed && styles.pressedEffect,  // Apply opacity effect when pressed
      ]}
    >
      <Text style={[styles.buttonText, isPrimary ? styles.primaryText : styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#4B0082',  // Dark blue for Save button
  },
  secondaryButton: {
    backgroundColor: '#C2185B',  // Dark red for Cancel button
  },
  pressedEffect: {
    opacity: 0.7,  // Apply semi-transparent overlay when pressed
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#fff',  // White text for Save button
  },
  secondaryText: {
    color: '#fff',  // White text for Cancel button
  },
});

export default PressableButton;
