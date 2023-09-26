import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './src/screens/StartScreen';
import Register from './src/screens/Register';
import DataChart from './src/charts/PieDataChart';
import LoginWithEmail from './src/screens/LoginWithEmail';
import Results from './src/screens/Results';
import Forms from './src/screens/Forms';
import Submissions from './src/screens/Submissions';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Summary from './src/screens/Summary';
import Wrapper from './src/components/Wrapper';
import OnboardingPage from './src/screens/onboardingScreens/OnboardingPage';
import OnboardingScreen from './src/screens/onboardingScreens/OnboardingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
            <Stack.Screen name="Forms" component={Forms} />
            <Stack.Screen name="Submissions" component={Submissions} />
            <Stack.Screen name="Summary" component={Summary} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="DataChart" component={DataChart} />
            <Stack.Screen name="Results" component={Results} />
            <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Wrapper>
    </Provider>
  );
}
