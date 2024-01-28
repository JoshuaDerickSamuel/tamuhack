import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const ExternalProfilePage = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [userSkills, setUserSkills] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const externalUID = route.params?.externalUID;

  useEffect(() => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if the current user is connected to the external user
    const connectionsRef = ref(db, `users/${user.uid}/connections`);
    onValue(connectionsRef, (snapshot) => {
      const connectionsData = snapshot.val();
      if (connectionsData) {
        const isConnectedToUser = Object.values(connectionsData).some(
          (connection) => connection.toUser === externalUID
        );
        setIsConnected(isConnectedToUser);
      }
    });

    const userRef = ref(db, `users/${externalUID}`);
    const preferencesRef = ref(db, `users/${externalUID}/preferences`);
    const skillsRef = ref(db, `users/${externalUID}/skills`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });

    onValue(preferencesRef, (snapshot) => {
      const preferencesData = snapshot.val();
      setUserPreferences(preferencesData);
    });

    onValue(skillsRef, (snapshot) => {
      const skillsData = snapshot.val();
      setUserSkills(skillsData);
    });
  }, [externalUID]);

  const handleConnect = () => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;
    const connectionsRef = ref(db, `users/${user.uid}/connections`);

    const newConnectionRef = push(connectionsRef);

    const newConnection = {
      fromUser: user.uid,
      toUser: externalUID,
      timestamp: Date.now(),
    };

    set(newConnectionRef, newConnection)
      .then(() => {
        console.log('Connection saved successfully');
        setIsConnected(true);
        // You can add additional logic here if needed
      })
      .catch((error) => {
        console.error('Error saving connection: ', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>External Profile</Text>
      {userData && (
        <View>
          <Text style={styles.text}>Username: {userData.username}</Text>
          <Text style={styles.text}>Email: {userData.email}</Text>
        </View>
      )}

      {userPreferences && (
        <View>
          <Text style={styles.header}>Preferences</Text>
          <Text style={styles.text}>Theme: {userPreferences.theme}</Text>
          <Text style={styles.text}>Language: {userPreferences.language}</Text>
        </View>
      )}

      {userSkills && (
        <View>
          <Text style={styles.header}>Skills</Text>
          {Object.values(userSkills).map((skill, index) => (
            <Text key={index} style={styles.text}>
              {index + 1}. {skill}
            </Text>
          ))}
        </View>
      )}

      {!isConnected && (
        <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  connectButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExternalProfilePage;
