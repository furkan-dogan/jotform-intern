import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HeaderResults from '../components/HeaderResults';
import Submissions from './Submissions';

function SummaryScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Summary</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Results({route}) {
  function SubmissionsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Submissions selectedForm={route?.params?.selectedForm}></Submissions>
      </View>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <HeaderResults />
      <Tab.Navigator
        screenOptions={{
          labelStyle: {fontSize: 16, fontFamily: 'Circular', fontWeight: '500'},
          activeTintColor: '#030D50',
          inactiveTintColor: 'gray',
          style: {backgroundColor: 'black'},
          indicatorStyle: {backgroundColor: '#030D50'},
        }}>
        <Tab.Screen name="Summary" component={SummaryScreen} />
        <Tab.Screen name="Submissions" component={SubmissionsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
