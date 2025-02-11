import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import GeneralHeader from "@/components/GeneralHeader";
import { SubmitButton, SecondaryButton } from "@/components/search";
import { useRouter, useLocalSearchParams } from "expo-router";

const PaymentStatus = () => {
  const router = useRouter();
  const { isSuccess } = useLocalSearchParams();
  const bookingSuccess = isSuccess === "true";

  const onBackPress = () => {
    router.back();
  };

  const handleBackToHomePress = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <GeneralHeader
        onBackPress={onBackPress}
        title={bookingSuccess ? "Thanh toán thành công" : "Thanh toán thất bại"}
      />
      <View style={{ paddingHorizontal: 20, alignItems: "center", paddingTop: 100, }}>
        <Text style={styles.title_text}>
          {bookingSuccess ? "Thanh toán thành công!" : "Lỗi khi thanh toán!"}
        </Text>
        {bookingSuccess && (
          <Text style={[styles.title_text, { fontSize: 16, marginTop: 20 }]}>
            Chúc mừng quý khách đã thanh toán thành công!
          </Text>
        )}
        <Text style={styles.content_text}>
          {bookingSuccess
            ? "Quý khách vui lòng theo dõi và hoàn thành các thủ tục còn lại (nếu có) theo hướng dẫn để có được trải nghiệm tốt nhất."
            : "Đã có lỗi xảy ra khi thanh toán. Quý khách vui lòng thử lại sau giây lát."}
        </Text>
        {bookingSuccess && (
          <Text style={styles.content_text}>
            Cảm ơn Quý khách đã sử dụng dịch vụ của{" "}
            <Text style={{ fontWeight: 500 }}>Hotelligence</Text>.
          </Text>
        )}
        <SecondaryButton
          text="Quay về Trang chủ"
          onPress={() => handleBackToHomePress()}
          style={{ marginTop: 20, width: "60%" }}
        />
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

export default PaymentStatus;
