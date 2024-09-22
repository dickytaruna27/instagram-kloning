// src/screens/RegisterScreen.jsx

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useMutation } from "@apollo/client";
import { DO_Register } from "../queries";
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mutateFunction, { data, loading, error }] = useMutation(DO_Register);
  const handleRegister = async () => {
    try {
      // console.log(username, name, email, password);
      await mutateFunction({
        variables: {
          name,
          email,
          username: username.toLocaleLowerCase(),
          password,
        },
      });

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
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
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#262626",
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
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    color: "#0095f6",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterScreen;
