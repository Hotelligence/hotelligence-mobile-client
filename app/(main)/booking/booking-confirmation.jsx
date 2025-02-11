import React, { useState } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import GeneralHeader from "@/components/GeneralHeader";
import { OtpInput } from "react-native-otp-entry";
import { SubmitButton } from "@/components/search";
import { useRouter, useLocalSearchParams } from "expo-router";
import { placeBookingAPI } from "@/api/BookingServices";
import { HttpStatusCode } from "axios";

const BookingConfirmation = () => {
  const router = useRouter();

  const [otpInput, setOTPInput] = useState("");
  const [helperText, setHelperText] = useState(" ");
  const [buttonLoading, setButtonLoading] = useState(false);

  const {
    userID,
    hotelID,
    roomID,
    roomName,
    fullName,
    email,
    phoneNumber,
    paymentMethod,
    paymentAmount,
    bookingDate,
    checkinDate,
    checkoutDate,
    cancelDue,
    unCancelDue,
  } = useLocalSearchParams();

  const bookingInfo = {
    userID,
    hotelID,
    roomID,
    roomName,
    fullName,
    email,
    phoneNumber,
    paymentMethod,
    paymentAmount,
    bookingDate,
    checkinDate,
    checkoutDate,
    cancelDue,
    unCancelDue,
  };

  const onBackPress = () => {
    router.back();
  };

  const handleVerifyOTPPress = async (bookingInfo, otpCode) => {
    Keyboard.dismiss();
    setButtonLoading(true);
    try {
      const response = await placeBookingAPI(bookingInfo, otpCode);
      if (response.status === HttpStatusCode.Created) {
        const isSuccess = true;
        router.replace({
          pathname: "booking/booking-status",
          params: { isSuccess: isSuccess },
        });
      }
    } catch (error) {
      console.log("Error in handleVerifyOTPPress: ", error);
      setHelperText("Mã OTP không chính xác, vui lòng kiểm tra lại");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <GeneralHeader onBackPress={onBackPress} title="Xác nhận đặt phòng" />
      <View style={{ paddingHorizontal: 15, alignItems: "center" }}>
        <Text style={styles.title_text}>Nhập mã OTP</Text>
        <Text style={styles.content_text}>
          Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email
          này trong hộp thư đến, hãy kiểm tra hộp thư rác.
        </Text>
        <OtpInput
          numberOfInputs={6}
          focusColor={COLOR.secondary_green_100}
          onTextChange={(text) => {
            setOTPInput(text);
            setHelperText(" ");
          }}
          theme={{
            containerStyle: { marginTop: 30 },
            pinCodeContainerStyle: {
              backgroundColor: "#D9D9D9",
              width: 55,
              height: 65,
              borderColor:
                helperText !== " "
                  ? COLOR.tertiary_red_100
                  : COLOR.primary_white_100,
            },
          }}
        />
        <Text style={styles.helper_text}>{helperText}</Text>
        <SubmitButton
          isLoading={buttonLoading}
          text="Tiếp tục"
          onPress={() => handleVerifyOTPPress(bookingInfo, otpInput)}
          style={{ marginTop: 40, width: "40%" }}
          disabled={otpInput.length < 6}
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
  },

  content_text: {
    fontSize: 14,
    color: COLOR.primary_blue_50,
    fontWeight: 400,
    marginTop: 15,
    textAlign: "center",
  },

  helper_text: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 14,
    color: COLOR.tertiary_red_100,
    alignSelf: "flex-start",
  },
});

export default BookingConfirmation;
