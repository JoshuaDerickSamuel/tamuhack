// SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Text, Alert, ImageBackground } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';

import firebase from '../firebaseConfig';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');

  const handleSignUp = () => {
    const auth = getAuth();
    const db = getDatabase();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUid(user.uid); // Store the user's UID

        // Push user data to Firebase Realtime Database
        const userRef = ref(db, `users/${user.uid}`); // 'users' is the path in the database
        const preferencesRef = ref(db, `users/${user.uid}/preferences`);
        const skillsRef = ref(db, `users/${user.uid}/skills`);
        set(userRef, {
          username,
          email,
        });
        set(preferencesRef, {
          // initialize default preferences here
          theme: 'light',
          language: 'english',
        });
        set(skillsRef, {
          1: 'null',
        });

        navigation.navigate('Main');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Signup Failed', errorMessage);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/login_bg.png')} // Path to your background image
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subHeader}>Sign up to get started!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.signInText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white', // Assuming a white background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default SignUpScreen;
