import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useMutation } from "@apollo/client";
import { Add_Post } from "../queries";

const AddPostScreen = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [addPost, { loading, error }] = useMutation(Add_Post, {
    onCompleted: () => {
      Alert.alert("Postingan berhasil ditambahkan!");
      setContent("");
      setTags("");
      setImgUrl("");
      navigation.navigate("Home");
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });

  const handleSubmit = async () => {
    if (!content) {
      Alert.alert("Error", "Konten tidak boleh kosong.");
      return;
    }

    const input = {
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      imgUrl,
    };

    try {
      await addPost({ variables: { input } });
    } catch (error) {
      console.log("Error saat mengirim postingan:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Postingan Baru</Text>
      <TextInput
        style={styles.input}
        placeholder="Tulis konten di sini..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan tag"
        value={tags}
        onChangeText={setTags}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan URL gambar (opsional)..."
        value={imgUrl}
        onChangeText={setImgUrl}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {loading ? "Mengirim..." : "Kirim"}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#0095f6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default AddPostScreen;
