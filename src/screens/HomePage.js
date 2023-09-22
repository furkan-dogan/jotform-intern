import React from 'react';
import {Button} from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomePage({navigation}) {
  return (
    <SafeAreaView>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        title="Logout"
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'StartScreen'}],
          })
        }></Button>
      <Button
        title="Data Chart"
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'DataChart'}],
          })
        }></Button>
    </SafeAreaView>
  );
}
