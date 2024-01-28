// Contact.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const Contact = ({ navigation }) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersArray = Object.keys(usersData).map((uid) => ({
          uid,
          ...usersData[uid],
        }));
        setUsersList(usersArray);
      } else {
        setUsersList([]);
      }
    });
  }, []);

  const navigateToExternalProfile = (externalUID) => {
    navigation.navigate('ExternalProfilePage', { externalUID });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigateToExternalProfile(item.uid)}
    >
      <Text style={styles.userName}>{item.username}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <FlatList
        data={usersList}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Contact;
