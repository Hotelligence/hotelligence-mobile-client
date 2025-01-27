import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import GeneralHeader from "@/components/GeneralHeader";
import { useRouter } from "expo-router";
import { bookingConfirmation } from "@/assets/TempData"; //delete later
import { isoStringToFullDateTime, formatVND } from "@/utils/ValueConverter";

const BookingInfoSection = ({}) => {
  return (
    <View style={styles.booking_info_section}>
      <Text style={styles.hotel_name_text}>
        {bookingConfirmation.hotelName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
          marginTop: 20,
        }}
      >
        <Text style={styles.label_text}>Nhận phòng</Text>
        <Text style={styles.content_text} numberOfLines={2}>
          {isoStringToFullDateTime(bookingConfirmation?.checkinTime)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={styles.label_text}>Trả phòng</Text>
        <Text style={styles.content_text} numberOfLines={2}>
          {isoStringToFullDateTime(bookingConfirmation?.checkoutTime)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={styles.label_text}>Số lượng</Text>
        <Text style={styles.content_text} numberOfLines={2}>
          {bookingConfirmation?.numOfRooms} phòng,{" "}
          {bookingConfirmation?.numOfNights} đêm
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, }}>
        <View style={styles.bullet_point} />
        <Text style={[styles.label_text, { fontSize: 18 }]}>
          {bookingConfirmation?.roomName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={styles.label_text}>Giá phòng</Text>
        <Text style={[styles.content_text, { textAlign: "right" }]}>
          {formatVND(bookingConfirmation?.roomPrice)}đ
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={styles.label_text}>Thuế & Phí</Text>
        <Text style={[styles.content_text, { textAlign: "right" }]}>
          {formatVND(bookingConfirmation?.taxAndFee)}đ
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={styles.label_text}>Tổng giá</Text>
        <Text style={[styles.total_price_text, { textAlign: "right" }]}>
          {formatVND(bookingConfirmation?.totalPrice)}đ
        </Text>
      </View>
    </View>
  );
};

const BookingConfirmation = () => {
  const router = useRouter();

  const onBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GeneralHeader title="Chi tiết đặt phòng" onBackPress={onBackPress} />
      <BookingInfoSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
  },

  booking_step_container: {},

  //Booking Info Section
  booking_info_section: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 10,
  },

  hotel_name_text: {
    fontSize: 24,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
    textAlign: "center",
  },

  label_text: {
    flex: 1,
    fontSize: 16,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
  },

  content_text: {
    flex: 2,
    fontSize: 16,
    fontWeight: 400,
    color: COLOR.primary_blue_100,
    marginStart: 5,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
    marginVertical: 20,
  },

  bullet_point: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLOR.primary_blue_100,
    marginHorizontal: 10,
  },

  total_price_text: {
    color: COLOR.primary_gold_120,
    fontSize: 24,
    fontWeight: 500,
  },

});

export default BookingConfirmation;
