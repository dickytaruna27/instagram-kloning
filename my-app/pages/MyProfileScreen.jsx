import React from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { My_Profile } from "../queries"; // Pastikan ini sesuai dengan path yang benar

const MyProfileScreen = () => {
  const { loading, error, data } = useQuery(My_Profile);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const { _id, name, username, email, following, followers } =
    data.FindMyProfile;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }} // Ganti dengan URL gambar yang sesuai
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileUsername}>@{username}</Text>
      <Text style={styles.profileEmail}>{email}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statCount}>{followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statCount}>{following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileUsername: {
    fontSize: 18,
    color: "gray",
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
});

export default MyProfileScreen;
