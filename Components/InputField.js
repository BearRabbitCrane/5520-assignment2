import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import commonStyles from '../Helpers/styles';

const InputField = ({ label, value, onChangeText, placeholder, keyboardType, isDarkTheme, multiline }) => {
  return (
    <>
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>{label}:</Text>
      <TextInput
        style={[styles.input, multiline && styles.descriptionInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor={commonStyles.textColor}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: commonStyles.primaryColor,
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: commonStyles.primaryColor,
    fontSize: 17,
    color: commonStyles.primaryColor,
    backgroundColor: 'white',
  },
  descriptionInput: {
    height: 130, // Adjust for multiline input
  },
});

export default InputField;
