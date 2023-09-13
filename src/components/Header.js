import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Circular',
    fontWeight: '400',
    wordWrap: 'break-word',
  },
});
