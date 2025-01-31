import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import GeneralHeader from "@/components/GeneralHeader";
import { SubmitButton, SecondaryButton } from "@/components/search";
import { useRouter, useLocalSearchParams } from "expo-router";

const BookingConfirmation = () => {
  const router = useRouter();
  const { isSuccess } = useLocalSearchParams();
  const bookingSuccess = isSuccess === "true";
  const paymentMethod = "online"; //adjust this later (cash or online)

  const onBackPress = () => {
    router.back();
  };

  const handleNextActionPress = () => { //go to payment screen if success, else go back to booking screen
    if (bookingSuccess) {
      router.push({
        pathname: "booking/payment",
        params: { paymentMethod: paymentMethod },
      });
    } else {
      router.dismissAll();
    }
  };

  const handleBackToHomePress = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <GeneralHeader
        onBackPress={onBackPress}
        title={bookingSuccess ? "Đặt phòng thành công" : "Đặt phòng thất bại"}
      />
      <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
        <Text style={styles.title_text}>
          {bookingSuccess ? "Xin chúc mừng!" : "Lỗi khi đặt phòng!"}
        </Text>
        {bookingSuccess && (
          <Text style={[styles.title_text, { fontSize: 16, marginTop: 20 }]}>
            Chúc mừng quý khách đã đặt phòng thành công!
          </Text>
        )}
        <Text style={styles.content_text}>
          {bookingSuccess
            ? "Quý khách vui lòng theo dõi và hoàn thành các thủ tục còn lại (nếu có) theo hướng dẫn để có được trải nghiệm tốt nhất."
            : "Đã có lỗi xảy ra khi đặt phòng. Quý khách vui lòng thử lại sau giây lát."}
        </Text>
        {bookingSuccess && (
          <Text style={styles.content_text}>
            Cảm ơn Quý khách đã sử dụng dịch vụ của{" "}
            <Text style={{ fontWeight: 500 }}>Hotelligence</Text>.
          </Text>
        )}
        <SubmitButton
          text={bookingSuccess ? "Thanh toán" : "Thử lại"}
          onPress={() => handleNextActionPress()}
          style={{ marginTop: 40, width: "40%" }}
        />
        {bookingSuccess && (
          <SecondaryButton
            text="Quay về Trang chủ"
            onPress={() => handleBackToHomePress()}
            style={{ marginTop: 20, width: "60%" }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
  },

  title_text: {
    fontSize: 30,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
    marginTop: 30,
    textAlign: "center",
  },

  content_text: {
    fontSize: 14,
    color: COLOR.primary_blue_100,
    fontWeight: 400,
    marginTop: 15,
    textAlign: "center",
  },
});

export default BookingConfirmation;
