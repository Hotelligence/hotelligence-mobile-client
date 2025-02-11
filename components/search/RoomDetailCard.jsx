import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { useState } from "react";
import { DiscountTag, RatingScoreTag } from ".";
import { formatVND } from "@/utils/ValueConverter";
import { NoImage, SubmitButton } from ".";
import { ChevronRight } from "lucide-react-native";  

const RoomDetailCard = ({
  roomName,
  imageURL,
  originPrice,
  discountPercentage,
  discountedPrice,
  totalPrice,
  numOfNights,
  style,
  onDetailPress,
  onSelectPress,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.image_container}>
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
            style={styles.room_name_text}
          >
            {roomName}
          </Text>
          <Pressable style={{ flexDirection: "row", alignItems: "center", marginTop: 15, }} onPress={onDetailPress}>
            <Text style={styles.view_detail_text}>Xem chi tiết phòng</Text>
            <ChevronRight
              size={16}
              color={COLOR.primary_gold_120}
              strokeWidth={2.25}
              style={{ marginTop: 2, }}
            />
          </Pressable>
        </View>
        <View style={styles.content_bottom_container}>
          {discountPercentage && discountedPrice ? (
            <>
              <DiscountTag discount={discountPercentage} />
              <Text style={styles.origin_price_text}>
                {formatVND(originPrice * numOfNights)}đ
              </Text>
            </>
          ) : null}
          <Text style={styles.discount_price_text}>
            {formatVND(discountedPrice * numOfNights)}đ
          </Text>
          <Text
            style={styles.total_price_text}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Tổng {formatVND(totalPrice * numOfNights)}đ bao gồm thuế
          </Text>
        </View>
        <SubmitButton text="Chọn" onPress={onSelectPress} style={{ width: "50%", marginStart: "auto", marginTop: 15, }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 280,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 20,
  },

  favorite_button: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },

  image_container: {
    width: "35%",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 19,
    borderBottomLeftRadius: 19,
  },

  content_container: {
    width: "65%",
    height: "100%",
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    borderLeftWidth: 1,
    borderLeftColor: COLOR.primary_blue_50,
    paddingVertical: 15,
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

  room_name_text: {
    fontWeight: 600,
    fontSize: 18,
    color: COLOR.primary_blue_100,
  },

  city_text: {
    fontWeight: 500,
    fontSize: 16,
    marginTop: 2,
    color: COLOR.primary_blue_100,
  },

  numOf_reviews_text: {
    fontSize: 11,
    color: COLOR.primary_blue_50,
  },

  rating_category_text: {
    fontWeight: 600,
    fontSize: 16,
    color: COLOR.primary_blue_100,
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
    color: COLOR.primary_blue_100,
  },

  total_price_text: {
    fontSize: 12,
    color: COLOR.primary_blue_50,
  },

  view_detail_text: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.primary_gold_120,
    textDecorationLine: "underline",
  },
});

export default RoomDetailCard;
