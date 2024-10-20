import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const InputField = forwardRef(({
  label, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType, 
  isDarkTheme, 
  isRequired, 
  validateNumber, 
  multiline = false,  // Default is not multiline
  inputStyle = {},  // Customizable input style
}, ref) => {
  const [inputError, setInputError] = useState(null);  // Manage error state

  // Function to validate the input field
  const validateInput = (text) => {
    if (isRequired && !text) {
      setInputError(`${label} is required.`);
      return false;
    }

    if (validateNumber && isNaN(text)) {
      setInputError(`${label} must be a valid number.`);
      return false;
    }

    setInputError(null);  // No error if input is valid
    return true;
  };

  useImperativeHandle(ref, () => ({
    validate: () => validateInput(value),
  }));

  return (
    <View>
      <Text style={[styles.label, isDarkTheme && { color: '#ffffff' }]}>{label}</Text>
      <TextInput
        style={[styles.input, isDarkTheme && { color: '#ffffff' }, inputStyle]}  // Apply custom input style
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}  // Support multiline input
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
});

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: '#4c0080',
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
