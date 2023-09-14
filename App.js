import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './src/screens/StartScreen';
import ResetPassword from './src/screens/ResetPassword';
import Register from './src/screens/Register';
import HomePage from './src/screens/HomePage';
import DataChart from './src/screens/DataChart';
import LoginWithEmail from './src/screens/LoginWithEmail';
import FormSubmissions from './src/screens/FormSubmissions';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="FormSubmissions" component={FormSubmissions} />
          <Stack.Screen name="DataChart" component={DataChart} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
