import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Role, useAuth } from "@/context/auth";
import WithAccess from "@/components/WithAccess";

const Home = () => {
  const { auth, onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Username: {auth?.user?.username}</Text>
      <Text>Role: {auth?.role}</Text>
      <Button title="Log Out" onPress={onLogout} />
      <WithAccess role={Role.ADMIN}>
        <Text>Visible to the Admin </Text>
      </WithAccess>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
