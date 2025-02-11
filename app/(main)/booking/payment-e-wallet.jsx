import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { COLOR } from "@/assets/colors/Colors";
import GeneralHeader from "@/components/GeneralHeader";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SecondaryButton } from "@/components/search";
import WebView from "react-native-webview";
import { submitPaymentAPI, updateBookingStatusAPI } from "@/api/BookingServices";
import { HttpStatusCode } from "axios";
import * as Linking from "expo-linking";

const PaymentEWallet = () => {
  const router = useRouter();
  const { bookingID, paymentAmount } = useLocalSearchParams();
  console.log(bookingID);
  console.log(paymentAmount);

  // const [paymentUrl, setPaymentUrl] = useState(null);

  // const handleDeepLink = (event) => {
  //   const data = Linking.parse(event.url);
  //   if (data.hostname === "payment" && data.path === "/callback") {
  //     const status = data.queryParams.status;
  //     if (status === "success") {
  //       console.log("Payment success");
  //       router.replace({
  //         pathname: "/booking/payment-status",
  //         params: { isSuccess: true },
  //       });
  //     } else {
  //       console.log("Payment failed");
  //       router.replace({
  //         pathname: "/booking/payment-status",
  //         params: { isSuccess: false },
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const subscription = Linking.addEventListener("url", handleDeepLink);
  //   return () => subscription.remove();
  // }, []);

  const onBackPress = () => {
    router.back();
  };

  const handleBackToHomePress = () => {
    router.replace("/");
  };

  const handleVNPayPress = async (bookingID, paymentAmount) => {
    console.log("Pressed");
    const response = await submitPaymentAPI(bookingID, paymentAmount);
    if (response.status === HttpStatusCode.Ok) {
      const paymentUrl = response.data;
      await Linking.openURL(paymentUrl);
      await updateBookingStatusAPI(bookingID, "Hoàn tất");
      router.push({
        pathname: "/booking/payment-status",
        params: { isSuccess: true },
      })
    }
  };

  const handleMoMoPress = () => {};

  return (
    <View style={styles.container}>
      <GeneralHeader title="Thanh toán" onBackPress={onBackPress} />
      <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
        <Text style={styles.title_text}>Thanh toán bằng Ví điện tử</Text>
        <Text style={[styles.content_text, { fontSize: 16, fontWeight: 500 }]}>
          Quý khách vui lòng chọn Ví điện tử
        </Text>
        <View style={styles.payment_select_container}>
          <Pressable
            style={styles.button}
            onPress={() => handleVNPayPress(bookingID, paymentAmount)}
          >
            <Text
              style={[
                styles.content_text,
                { fontWeight: 500, fontSize: 16.5, marginTop: 0 },
              ]}
            >
              Ví VNPay
            </Text>
            <Image
              style={styles.logo}
              source={require("@/assets/images/VNPay_Logo.png")}
            />
          </Pressable>
          {/* <Pressable style={styles.button} onPress={handleMoMoPress}>
            <Text
              style={[
                styles.content_text,
                { fontWeight: 500, fontSize: 16.5, marginTop: 0 },
              ]}
            >
              Ví MoMo
            </Text>
            <Image
              style={styles.logo}
              source={require("@/assets/images/MoMo_Logo.png")}
            />
          </Pressable> */}
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
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginVertical: 40,
  },

  title_text: {
    fontSize: 28,
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
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 8,
    padding: 20,
  },

  logo: {
    width: 90,
    height: 90,
    marginTop: 15,
  },
});

export default PaymentEWallet;
