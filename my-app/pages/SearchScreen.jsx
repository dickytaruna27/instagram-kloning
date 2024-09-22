import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLazyQuery } from "@apollo/client";
import { SearchUserByuserame } from "../queries";

const SearchScreen = () => {
  const [username, setUsername] = useState("");
  const [searchUser, { data, loading, error }] =
    useLazyQuery(SearchUserByuserame);

  const handleSearch = () => {
    if (username) {
      searchUser({ variables: { username } });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari pengguna..."
        value={username}
        onChangeText={setUsername}
        style={styles.searchInput}
      />
      <Button title="Cari" onPress={handleSearch} color="#1DA1F2" />

      {loading && <Text style={styles.message}>Loading...</Text>}
      {error && <Text style={styles.message}>Error: {error.message}</Text>}

      {data && data.searchUserByUsername && (
        <View style={styles.resultContainer}>
          <TouchableOpacity style={styles.userCard}>
            {/* Placeholder gambar profil */}
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.username}>
                {data.searchUserByUsername.username}
              </Text>
              <Text style={styles.email}>
                {data.searchUserByUsername.email}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
    marginTop: 10,
    color: "#888",
  },
  resultContainer: {
    marginTop: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    justifyContent: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});

export default SearchScreen;
