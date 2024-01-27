import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackNavigator } from './navigation/StackNavigator';
import DrawerNavigator from './navigation/DrawerNavigator';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Howdy" component ={WelcomeScreen}/>
        <Stack.Screen name = "Auth" component={AuthStackNavigator}/>
        <Stack.Screen name = "Main" component={DrawerNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
