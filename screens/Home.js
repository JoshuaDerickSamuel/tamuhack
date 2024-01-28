import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userConnections, setUserConnections] = useState([]);

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

        // Fetch user connections
        const connectionsRef = ref(db, 'connections');
        onValue(connectionsRef, (snapshot) => {
          const connectionsData = snapshot.val();
          const userConnectionsArray = Object.keys(connectionsData)
            .filter((connectionId) => {
              const connection = connectionsData[connectionId];
              return connection.fromUser === user.uid || connection.toUser === user.uid;
            })
            .map((connectionId) => connectionsData[connectionId]);

          setUserConnections(userConnectionsArray);
        });
      } else {
        setUserData(null);
        setUserConnections([]);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run once on component mount

  const renderConnectionCard = ({ item }) => (
    <TouchableOpacity
      style={styles.connectionCard}
      onPress={() => navigation.navigate('ExternalProfilePage', { externalUID: item.toUser })}
    >
      <Text style={styles.connectionCardText}>{item.toUser}</Text>
      {/* Add additional details based on your connection object */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      {userData && (
        <Text>
          User Data: {userData.username} - {userData.email}
        </Text>
      )}

      {/* Show user connections */}
      <FlatList
        data={userConnections}
        renderItem={renderConnectionCard}
        keyExtractor={(item) => item.connectionId}
      />

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
  connectionCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
  },
  connectionCardText: {
    fontSize: 18,
  },
});

export default Home;
