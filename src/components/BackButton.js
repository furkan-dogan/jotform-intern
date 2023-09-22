import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/chevron-left.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  image: {
    width: 24,
    height: 24,
  },
});
