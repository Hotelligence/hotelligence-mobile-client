import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { FavoriteButton } from "../home";
import { COLOR } from "@/assets/colors/Colors";
import { useState } from "react";
import { DiscountTag, RatingScoreTag } from ".";
import { formatVND } from "@/utils/ValueConverter";
import { NoImage } from ".";

const HotelDetailCard = ({
  hotelName,
  imageURL,
  city,
  ratingScore,
  ratingCategory,
  numOfReviews,
  originPrice,
  discount,
  discountPrice,
  taxPrice,
  extraFee,
  totalPrice,
  style,
  isFavorite,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.image_container}>
        <FavoriteButton
          style={styles.favorite_button}
          isFavorite={isFavorite}
        />
        {imageError ? (
          <NoImage
            style={{ borderTopLeftRadius: 14, borderBottomLeftRadius: 14 }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: imageURL,
            }}
            onError={() => setImageError(true)}
          />
        )}
      </View>
      <View style={styles.content_container}>
        <View style={styles.content_top_container}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.hotel_name_text}
          >
            {hotelName}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.city_text}>
            {city}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <RatingScoreTag ratingScore={ratingScore} />
            <View style={{ marginStart: 4 }}>
              <Text style={styles.numOf_reviews_text}>
                ({numOfReviews} đánh giá)
              </Text>
              <Text style={styles.rating_category_text}>{ratingCategory}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content_bottom_container}>
          {discount && discountPrice && (
            <>
              <DiscountTag discount={discount} />
              <Text style={styles.origin_price_text}>
                {formatVND(originPrice)}đ
              </Text>
            </>
          )}
          <Text style={styles.discount_price_text}>
            {formatVND(discountPrice)}đ
          </Text>
          <Text
            style={styles.total_price_text}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Tổng {formatVND(totalPrice)}đ bao gồm thuế và phí
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 350,
    height: 280,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 15,
  },

  favorite_button: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },

  image_container: {
    width: "30%",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },

  content_container: {
    width: "70%",
    height: "100%",
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderLeftWidth: 1,
    borderLeftColor: COLOR.primary_blue_50,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  content_top_container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  content_bottom_container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  hotel_name_text: {
    fontWeight: 700,
    fontSize: 18,
  },

  city_text: {
    fontWeight: 500,
    fontSize: 16,
    marginTop: 2,
  },

  numOf_reviews_text: {
    fontSize: 11,
    color: COLOR.primary_blue_50,
  },

  rating_category_text: {
    fontWeight: 600,
    fontSize: 16,
  },
  
  origin_price_text: {
    fontSize: 14,
    color: COLOR.primary_blue_50,
    textDecorationLine: "line-through",
  },

  discount_price_text: {
    fontWeight: 500,
    fontSize: 22,
    marginVertical: 2,
  },

  total_price_text: {
    fontSize: 12,
    color: COLOR.primary_blue_50,
  },

});

export default HotelDetailCard;
