import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR } from '@/assets/colors/Colors'
import GeneralHeader from '@/components/GeneralHeader'
import { OtpInput } from 'react-native-otp-entry'
import { SubmitButton } from '@/components/search' 
import { useRouter } from 'expo-router'

const BookingConfirmation = () => {
  const router = useRouter();

  const [otpInput, setOTPInput] = useState("");

  const onBackPress = () => {
    router.back();
  }

  const handleVerifyOTPPress = () => {
    console.log("Verify OTP Pressed: ", otpInput);
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
          onTextChange={(text) => setOTPInput(text)}
          theme={{
            containerStyle: { marginTop: 30, },
            pinCodeContainerStyle: { backgroundColor: "#D9D9D9", },
          }}
        />
        <SubmitButton
          text="Tiếp tục"
          onPress={() => handleVerifyOTPPress()}
          style={{ marginTop: 40, width: "40%" }}
          disabled={otpInput.length < 6}
        />
      </View>
    </View>
  );
}

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
    textAlign: 'center',
  },
});

export default BookingConfirmation;
