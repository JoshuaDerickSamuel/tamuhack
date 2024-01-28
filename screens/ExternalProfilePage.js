// ExternalProfilePage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const ExternalProfilePage = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [userSkills, setUserSkills] = useState(null);

  const { externalUID } = route.params;

  useEffect(() => {
    const db = getDatabase();

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

export default ExternalProfilePage;
