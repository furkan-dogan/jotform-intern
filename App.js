import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './src/screens/StartScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomePage from './src/screens/HomePage';
import DataChart from './src/screens/DataChart';
import SignupEmail from './src/screens/SignupEmail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SignupEmail" component={SignupEmail} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="DataChart" component={DataChart} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
