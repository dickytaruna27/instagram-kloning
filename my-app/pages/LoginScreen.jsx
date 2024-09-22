// src/screens/LoginScreen.jsx

import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useMutation } from "@apollo/client";
import { DO_LOGIN } from "../queries";
import { LoginContext } from "../contexts/LoginContext";
import * as SecureStore from "expo-secure-store";
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(LoginContext);

  const [LoginMutation, { data, loading, error }] = useMutation(DO_LOGIN, {
    onCompleted: async (res) => {
      let access_token = null;
      console.log("login response", res);

      if (res && res.login && res.login.access_token) {
        access_token = res.login.access_token;
      }

      if (access_token) {
        await SecureStore.setItemAsync("access_token", access_token);
        setIsLoggedIn(true);
        navigation.navigate("Home");
      } else {
        console.log("error login failed");
      }
    },
    onError: (err) => {
      console.log("login error", err);
    },
  });

  const handleLogin = async () => {
    if (!username || !password) {
      console.log("Username or password is required");
      return;
    }
    try {
      await LoginMutation({
        variables: {
          username: username.toLocaleLowerCase(),
          password,
        },
      });
    } catch (error) {
      console.log("error in login mutation");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
        }}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: "#dbdbdb",
    borderWidth: 1,
  },
  button: {
    width: "100%",
    backgroundColor: "#0095f6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerLink: {
    color: "#0095f6",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default LoginScreen;
