import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { Heart } from "lucide-react-native";

const FavoriteButton = ({ style, isFavorite, disabled, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      {isFavorite ? (
        <Heart
          size={24}
          color={COLOR.tertiary_red_100}
          fill={COLOR.tertiary_red_100}
        />
      ) : (
        <Heart size={24} fill={COLOR.primary_white_100} color={COLOR.tertiary_red_100} strokeWidth={2} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 100,
    padding: 18,
    paddingTop: 19,
    backgroundColor: "#fff",
  },
});

export default FavoriteButton;
