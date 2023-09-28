import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {blue} from 'react-native-reanimated';

export default function TextInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: blue,
  },
  description: {
    fontSize: 13,
    color: '#414757',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: '#f13a59',
    paddingTop: 8,
  },
});
