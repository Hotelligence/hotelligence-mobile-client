import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLOR } from "@/assets/colors/Colors";
import GeneralHeader from "@/components/GeneralHeader";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SecondaryButton, SubmitButton } from "@/components/search";

const Payment = () => {
  const router = useRouter();
  const { paymentMethod } = useLocalSearchParams();
  const isOnlinePayment = paymentMethod === "online";

  const onBackPress = () => {
    router.back();
  };

  const handleBackToHomePress = () => {
    router.replace("/");
  };

  const handleEWalletPress = () => {
    router.push({
      pathname: "booking/payment-e-wallet",
    });
  };

  const handleCreditCardPress = () => {};

  return (
    <View style={styles.container}>
      <GeneralHeader title="Thanh toán" onBackPress={onBackPress} />
      <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
        <Text style={styles.title_text}>
          {!isOnlinePayment
            ? "Thanh toán tại khách sạn"
            : "Thanh toán trực tuyến"}
        </Text>
        <Text style={[styles.content_text, { fontSize: 16, fontWeight: 500 }]}>
          {!isOnlinePayment
            ? "Quý khách đã chọn phương thức thanh toán tại khách sạn!"
            : "Quý khách vui lòng chọn hình thức thanh toán trực tuyến"}
        </Text>
        {!isOnlinePayment && (
          <Text style={[styles.content_text, { marginBottom: 40 }]}>
            Quý khách vui lòng thanh toán sau khi nhận phòng hoặc trả phòng tại
            khách sạn theo hướng dẫn của lễ tân/quản lý khách sạn.
          </Text>
        )}
        <View style={styles.payment_select_container}>
          <SubmitButton
            text="Ví điện tử"
            onPress={() => handleEWalletPress()}
            style={styles.button}
          />
          <SubmitButton
            text="Thẻ tín dụng"
            onPress={() => handleCreditCardPress()}
            style={styles.button}
          />
        </View>
        <SecondaryButton
          text="Quay về Trang chủ"
          onPress={() => handleBackToHomePress()}
          style={{ width: "60%" }}
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

  payment_select_container: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    marginVertical: 40,
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
    marginTop: 20,
    textAlign: "center",
  },

  button: {
    borderRadius: 10,
    paddingVertical: 27,
    paddingHorizontal: 20,
    width: "50%",
  },
});

export default Payment;
