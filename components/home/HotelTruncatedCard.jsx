import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { FavoriteButton } from ".";
import { COLOR } from "@/assets/colors/Colors";
import { useState } from "react";
import { ImageOff } from "lucide-react-native";

const HotelTruncatedCard = ({ imageURL, hotelName, city, ratingScore, numOfReviews, isFavorite, style, onPress }) => {
  const [imageError, setImageError] = useState(false);


  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {imageError ? (
        <View style={styles.image_off_container}>
          <ImageOff size={48} color={COLOR.primary_blue_50} />
        </View>
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: imageURL,
          }}
          onError={() => setImageError(true)}
        />
      )}
      {/* <FavoriteButton isFavorite={isFavorite} style={styles.favorite_button} /> */}
      <View style={styles.content_container}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.text_hotel_name}
        >
          {hotelName}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.text_general}
        >
          {city}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 15,
    width: 190,
  },

  content_container: {
    padding: 10,
  },

  image_off_container: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
  },

  image: {
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  text_hotel_name: {
    fontWeight: 500,
    fontSize: 18,
    color: COLOR.primary_blue_100,
  },

  text_general: {
    fontWeight: 500,
    fontSize: 14,
    color: COLOR.primary_blue_100,
  },

  rating_container: {
    flexDirection: "row",
    marginTop: 6,
  },

  text_reviews: {
    fontSize: 14,
    color: COLOR.primary_blue_50,
    marginStart: 4,
  },

  favorite_button: {
    position: "absolute",
    left: 144,
    top: 10,
  },
});

export default HotelTruncatedCard;
