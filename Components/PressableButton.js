import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import commonStyles from '../Helpers/styles';

const PressableButton = ({ title, onPress, type = 'primary' }) => {
  const isPrimary = type === 'primary';
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton,
        !isPrimary && styles.secondaryButton,  // Apply secondary button style if not primary
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
  pressedButton: {
    backgroundColor: '#1E90FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#1E90FF',
  },
});

export default PressableButton;
