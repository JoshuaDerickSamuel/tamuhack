// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [userSkills, setUserSkills] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const preferencesRef = ref(db, `users/${user.uid}/preferences`);
        const skillsRef = ref(db, `users/${user.uid}/skills`);

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
      } else {
        setUserData(null);
        setUserPreferences(null);
        setUserSkills(null);
      }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array to run once on component mount

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
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
});

export default ProfilePage;
