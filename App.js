import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackNavigator, PrefrencesStackNavigator } from './navigation/StackNavigator';
import DrawerNavigator from './navigation/DrawerNavigator';
import WelcomeScreen from './screens/WelcomeScreen';
import Onboarding from './components/Onboarding';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Howdy" component ={Onboarding} options={{ headerShown: false }}/>
        <Stack.Screen name = "Auth" component={AuthStackNavigator} options={{ headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name = "Pref" component={PrefrencesStackNavigator} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name = "Main" component={DrawerNavigator} options={{ headerShown: false , gestureEnabled: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
