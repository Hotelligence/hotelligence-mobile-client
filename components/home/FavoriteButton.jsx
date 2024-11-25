import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { HeartFill, HeartStroke } from "@/assets/icons";

const FavoriteButton = ({ style, isFavorite, disabled, onPress }) => {

  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.container, style]}>
        {
            isFavorite ? (
                <HeartFill width={24} height={22} fill={COLOR.tertiary_red_100}/>
            ) : (
                <HeartStroke width={24} height={22} fill={COLOR.tertiary_red_100}/>
            )
        }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
