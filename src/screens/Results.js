import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Submissions from './Submissions';
import Summary from './Summary';
import Wrapper from '../components/Wrapper';

const Tab = createMaterialTopTabNavigator();

export default function Results({route}) {
  const navigation = useNavigation();

  function SummaryScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Wrapper>
          <Summary
            selectedForm={route?.params?.selectedForm}
            navigationState={navigation}></Summary>
        </Wrapper>
      </View>
    );
  }
  function SubmissionsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Submissions selectedForm={route?.params?.selectedForm}></Submissions>
      </View>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          labelStyle: {fontSize: 16},
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
