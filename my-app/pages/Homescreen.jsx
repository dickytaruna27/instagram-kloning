import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { LoginContext } from "../contexts/LoginContext";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { Read_Post } from "../queries";
import { SafeAreaView } from "react-native-safe-area-context";
import LikeButton from "./AddLike";
import AddComment from "./AddComment";
import { useState } from "react";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(LoginContext);
  const { loading, error, data } = useQuery(Read_Post);
  const [commentingPostId, setCommentingPostId] = useState(null);

  if (loading) {
    return <Text>Loading.....</Text>;
  }

  if (error) {
    console.log(error);
    return (
      <SafeAreaView>
        <Text>{error.message}</Text>
      </SafeAreaView>
    );
  }

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsLoggedIn(false);
    navigation.navigate("Login");
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }} // Gambar placeholder
          style={styles.authorImage}
        />
        <Text style={styles.postAuthor}>
          {item?.authorId || "Penulis Tidak Diketahui"}
        </Text>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.imgUrl,
          }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.actions}>
        <LikeButton postId={item._id} />
        <TouchableOpacity style={styles.actionButton}></TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate("AddComment", { postId: item._id })
          } // Kirim item sebagai post
        >
          <Icon name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.actionText}>Komentar</Text>
        </TouchableOpacity>
      </View>
      <AddComment postId={item._id} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Instagram</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="exit-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.feed}
        data={data.readPost}
        renderItem={renderPostItem}
        kekeyExtractor={(item) => `${item.authorId}-${item.createdAt}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Warna latar belakang
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF", // Latar belakang header
    elevation: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  feed: {
    flex: 1,
    padding: 10,
  },
  postCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postAuthor: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postContent: {
    fontSize: 14,
    marginVertical: 5,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
