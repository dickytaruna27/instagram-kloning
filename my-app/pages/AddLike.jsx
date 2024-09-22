import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import { Add_Like } from "../queries";

const LikeButton = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false); // State untuk menyimpan status like
  const [addLike] = useMutation(Add_Like);

  const handleLike = async () => {
    try {
      await addLike({ variables: { input: { postId } } });
      setIsLiked(true); // Ubah status like menjadi true
    } catch (error) {
      console.log("Error adding like:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
      <Icon
        name={isLiked ? "heart" : "heart-outline"}
        size={24}
        color={isLiked ? "red" : "black"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
  },
});

export default LikeButton;
