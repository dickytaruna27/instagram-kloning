import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useMutation } from "@apollo/client";
import { Add_Comment, Read_Post } from "../queries";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddCommentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const postId = route.params?.postId; // Ensure postId is passed correctly
  const [content, setContent] = useState("");

  const [setCommentText, { loading, error }] = useMutation(Add_Comment, {
    refetchQueries: [{ query: Read_Post }],
    onCompleted: () => {
      setContent(""); // Clear input field after successful mutation
      navigation.goBack(); // Navigate back to the previous screen
    },
  });

  const handleAddComment = async () => {
    if (!content.trim()) return; // Prevent adding empty comments

    try {
      await setCommentText({
        variables: {
          input: {
            postId,
            content,
          },
        },
      });
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Comment</Text>
        <TouchableOpacity onPress={handleAddComment}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: "https://example.com/user-avatar.jpg" }} // Replace with actual avatar URL
          style={styles.avatar}
        />
        <TextInput
          style={styles.input}
          onChangeText={setContent}
          placeholder="Write your comment..."
          value={content}
        />
      </View>
      {loading && <Text>Posting comment...</Text>}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelText: {
    color: "#007BFF",
  },
  postText: {
    color: "#007BFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default AddCommentScreen;
