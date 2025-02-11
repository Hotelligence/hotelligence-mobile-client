import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { NoImage, SubmitButton, SecondaryButton } from "../search";
import { HttpStatusCode } from "axios";
import { getHotelByID_API } from "@/api/HotelServices";

const HotelHistoryCard = ({
  hotelID,
  bookingID,
  bookingDate,
  checkinDate,
  checkoutDate,
  bookingStatus,
  style,
  onRatingPress,
  onCancelPress,
  onPaymentPress,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);
  const [hotelInfo, setHotelInfo] = useState();

  const status =
    bookingStatus === "Đang chờ thanh toán"
      ? "PENDING"
      : bookingStatus === "Hoàn tất"
      ? "COMPLETED"
      : bookingStatus === "Đã hủy"
      ? "CANCELLED"
      : "RATED";

  useEffect(() => {
    const fetchHotelInfo = async (hotelID) => {
      const response = await getHotelByID_API(hotelID);
      if (response.status === HttpStatusCode.Ok) {
        setHotelInfo(response.data);
      }
    };

    fetchHotelInfo(hotelID);
  }, []);

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.image_container}>
        {imageError || !hotelInfo?.images ? (
          <NoImage
            style={{ borderTopLeftRadius: 14, borderBottomLeftRadius: 14 }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: hotelInfo.images[0],
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
            {hotelInfo?.hotelName}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.city_text}>
            {hotelInfo?.city}
          </Text>
          <View style={{ marginTop: 12, gap: 5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.label_text}>Mã đặt phòng</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.content_text}
              >
                {bookingID}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.label_text}>Đặt phòng</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.content_text}
              >
                {bookingDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.label_text}>Nhận phòng</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.content_text}
              >
                {checkinDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.label_text}>Trả phòng</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.content_text}
              >
                {checkoutDate}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 10,
            }}
          >
            <Text style={styles.label_text}>Tình trạng</Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[
                styles.content_text,
                {
                  color:
                    status === "COMPLETED"
                      ? COLOR.secondary_green_100
                      : status === "PENDING"
                      ? COLOR.secondary_blue_100
                      : status === "CANCELLED"
                      ? COLOR.secondary_red_100
                      : COLOR.primary_gold_120
                },
              ]}
            >
              {status === "COMPLETED"
                ? "Hoàn tất"
                : status === "PENDING"
                ? "Đang chờ thanh toán"
                : status === "CANCELLED"
                ? "Đã hủy"
                : "Đã đánh giá"}
            </Text>
          </View>
        </View>
        <View style={styles.content_bottom_container}>
          {status === "COMPLETED" && (
            <SecondaryButton
              text="Đánh giá"
              fontSize={16}
              onPress={onRatingPress}
              color={COLOR.primary_gold_120}
              style={{ width: "50%", paddingVertical: 6 }}
            />
          )}
          {status === "PENDING" && (
            <>
              <SecondaryButton
                text="Hủy đặt phòng"
                fontSize={16}
                onPress={onCancelPress}
                color={COLOR.primary_blue_100}
                style={{ width: "70%", paddingVertical: 6 }}
              />
              <SubmitButton
                text="Thanh toán"
                fontSize={16}
                color={COLOR.primary_white_100}
                onPress={onPaymentPress}
                style={{ width: "55%", paddingVertical: 6, marginTop: 10 }}
              />
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 300,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 15,
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
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  content_top_container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  content_bottom_container: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },

  hotel_name_text: {
    fontWeight: 700,
    fontSize: 18,
    color: COLOR.primary_blue_100,
  },

  city_text: {
    fontWeight: 500,
    fontSize: 16,
    marginTop: 2,
    color: COLOR.primary_blue_100,
  },

  label_text: {
    fontWeight: 500,
    fontSize: 13,
    color: COLOR.primary_blue_100,
    flex: 1,
  },

  content_text: {
    fontWeight: 400,
    fontSize: 13,
    color: COLOR.primary_blue_100,
    flex: 1,
  },
});

export default HotelHistoryCard;
