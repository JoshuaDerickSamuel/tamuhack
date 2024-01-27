import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the prefrences screen</Text>
      <Button
        title="Go to Skills Screen"
        onPress={() => navigation.navigate("Skills")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;