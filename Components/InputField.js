import React, { useState } from 'react';
import { TextInput, Text, View, Alert, StyleSheet } from 'react-native';

const InputField = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType, 
  isDarkTheme, 
  isRequired, 
  validateNumber, 
  showAlert = true  // New prop to control whether to show alerts or not
}) => {
  const [inputError, setInputError] = useState(null);  // Manage error state

  // Function to validate the input field
  const validateInput = (text) => {
    if (isRequired && !text) {
      setInputError(`${label} is required.`);
      if (showAlert) Alert.alert('Invalid Input', `${label} cannot be empty.`);
      return false;
    }

    if (validateNumber && isNaN(text)) {
      setInputError(`${label} must be a number.`);
      if (showAlert) Alert.alert('Invalid Input', `${label} must be a valid number.`);
      return false;
    }

    setInputError(null);  // No error if input is valid
    return true;
  };

  return (
    <View>
      <Text style={[styles.label, isDarkTheme && { color: '#ffffff' }]}>{label}</Text>
      <TextInput
        style={[styles.input, isDarkTheme && { color: '#ffffff' }]}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={(text) => {
          validateInput(text);  // Validate on every text change
          onChangeText(text);  // Update parent component
        }}
        placeholderTextColor={isDarkTheme ? '#d3d3d3' : '#666666'}
      />
      {/* Display error message */}
      {inputError && <Text style={styles.errorText}>{inputError}</Text>} 
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#4c0080',
    fontWeight: '400',
    fontSize: 17,
    color: '#4c0080',
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default InputField;
