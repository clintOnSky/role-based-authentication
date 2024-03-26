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
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, onRegister, onLogout } = useAuth();

  const onSignInPress = async () => {
    const response = await onLogin!(email, password);
    if (response.error) {
      alert(`Error: ${response.msg}`);
    }
  };

  const onRegisterPress = async () => {
    onRegister!(email, password).then((res) => {
      if (res.error) {
        return alert(`Error: ${res.msg}`);
      }
      onLogin!(email, password);
    });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://api.developbetterapps.com/users"
      );
      console.log(response.data);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);
      return { error: true, message: e.response.data.message };
    }
  };

  const onFetchUsersPress = async () => {
    fetchUsers().then((res) => {
      if (res.error) {
        return alert(res.message);
      }
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
        <TouchableOpacity style={styles.button} onPress={onFetchUsersPress}>
          <Text style={styles.buttonTxt}>Fetch Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonTxt}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
