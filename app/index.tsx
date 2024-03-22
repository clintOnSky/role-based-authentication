import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/auth";

const Home = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const { onLogin, onSignup } = useAuth();

  const onSignInPress = () => {
    onLogin!(username, password);
  };

  const onSignUpPress = async () => {
    onSignup!(username, password);
  };

  const onUserSignInPress = async () => {
    onLogin!("user", "user");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>My Auth</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonTxt}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onUserSignInPress}>
          <Text style={styles.buttonTxt}>Sign In as User</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "500",
  },
  form: { marginHorizontal: 40, gap: 20 },
  input: {
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  buttonTxt: { color: "#fff", fontSize: 20, fontWeight: "500" },
});
