import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './src/screens/StartScreen';
import ResetPassword from './src/screens/ResetPassword';
import Register from './src/screens/Register';
import HomePage from './src/screens/HomePage';
import DataChart from './src/screens/DataChart';
import LoginWithEmail from './src/screens/LoginWithEmail';
import Submissions from './src/screens/Submissions';
import Forms from './src/screens/Forms';
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
          <Stack.Screen name="Forms" component={Forms} />
          <Stack.Screen name="DataChart" component={DataChart} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Submissions" component={Submissions} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
