import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import About from "../screens/About";
import Contact from "../screens/Contact"
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PreferenceScreen from '../screens/AddPref'
import SkillScreen from '../screens/AddSkill'

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen}options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const PrefrencesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Prefrences" component={PreferenceScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Skills" component={SkillScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator, AuthStackNavigator, PrefrencesStackNavigator };