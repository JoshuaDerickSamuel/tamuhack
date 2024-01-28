// AddSkill.js

import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';

const AddSkill = ({ navigation }) => {
  const [skill, setSkill] = useState('');

  const handleAddSkill = () => {
    // Get the current user's UID
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Push the skill to the 'skills' path in the user's directory
      const db = getDatabase();
      const skillsRef = ref(db, `users/${user.uid}/skills`);

      push(skillsRef, skill)
        .then(() => {
          console.log('Skill added successfully');
          // Optionally, you can reset the skill input after pushing
          setSkill('');
        })
        .catch((error) => {
          console.error('Error adding skill: ', error.message);
        });
    } else {
      console.error('User not authenticated'); // Handle this case appropriately
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Skill</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your skill here"
        value={skill}
        onChangeText={setSkill}
      />
      <Button title="Add Skill" onPress={handleAddSkill} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Main')} />
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
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
});

export default AddSkill;
