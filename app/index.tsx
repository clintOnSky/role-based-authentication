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
import { useAuth } from "@/context/authContext";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, onRegister } = useAuth();

  const onSignInPress = async () => {
    await onLogin!(email, password);
  };

  const onRegisterPress = async () => {
    onRegister!(email, password).then(() => {
      onLogin!(email, password);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>My Auth</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
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
        <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
          <Text style={styles.buttonTxt}>Register</Text>
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
