// WelcomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Onboarding from '../components/Onboarding';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Onboarding/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
