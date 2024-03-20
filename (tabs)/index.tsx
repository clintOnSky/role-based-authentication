import { useAuth } from "@/context/authContext";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  const { authState, onLogout } = useAuth();

  const onSignOutPress = async () => {
    onLogout!();
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text> */}
      <Text style={styles.title}>Role: {authState?.role}</Text>
      <Button title="Logout" onPress={onSignOutPress} />
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
