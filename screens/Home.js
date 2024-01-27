// Home.js

import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  // UseEffect to listen to authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    // Check if a user is signed in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch user data from the Realtime Database based on the user's UID
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUserData(data);
        });
      } else {
        setUserData(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run once on component mount

  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      {userData && (
        <Text>
          User Data: {userData.username} - {userData.email}
        </Text>
      )}
      <Button title="Go to About Screen" onPress={() => navigation.navigate('About')} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Home;
