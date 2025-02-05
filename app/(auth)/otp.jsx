import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import {
  SubmitButton,
  SecondaryButton,
  CircleButton,
} from "@/components/search";
import { OtpInput } from "react-native-otp-entry";
import { ArrowLeft } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const OTPScreen = () => {
  const router = useRouter();
  // const { type } = useLocalSearchParams();
  const type = "signup" //Delete later

  const [otpInput, setOTPInput] = useState("");
  const [isAllowGetNewCode, setIsAllowGetNewCode] = useState(false);
  const [delaySeconds, setDelaySeconds] = useState(30);

  useEffect(() => {
    if (!isAllowGetNewCode) {
      const interval = setInterval(() => {
        setDelaySeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAllowGetNewCode]);

  useEffect(() => {
    if (!isAllowGetNewCode) {
      setTimeout(() => {
        setIsAllowGetNewCode(true);
      }, 30000);
    }
  }, [isAllowGetNewCode]);

  const onBackPress = () => {
    router.back();
  };

  const handleLoginPress = async () => {};

  const handleSignUpPress = async () => {
    router.replace("signup-create-name");
  };

  const handlePassRegisterPress = async () => {
    router.replace("/password-reset")
  };

  const handleConfirmByPasswordPress = () => {
    router.replace("/login-password");
  };

  const resendCode = async () => {
    setIsAllowGetNewCode(false);
    setDelaySeconds(30);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLOR.primary_white_100 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <CircleButton
          Icon={ArrowLeft}
          color={COLOR.primary_blue_100}
          onPress={() => onBackPress()}
          style={styles.back_button}
        />
        <Text style={styles.title_text}>Xác thực OTP</Text>
        <Text style={styles.content_text}>
          Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email
          này trong hộp thư đến, hãy kiểm tra hộp thư rác
        </Text>
        <OtpInput
          numberOfInputs={6}
          focusColor={COLOR.secondary_green_100}
          onTextChange={(text) => setOTPInput(text)}
          theme={{
            containerStyle: { marginTop: 30 },
            pinCodeContainerStyle: {
              backgroundColor: "#D9D9D9",
              width: 55,
              height: 65,
            },
          }}
        />
        <SubmitButton
          disabled={otpInput.length < 6}
          text="Tiếp tục"
          onPress={
            type === "login"
              ? () => handleLoginPress()
              : type === "signup"
              ? () => handleSignUpPress()
              : type === "forgotPassword"
              ? () => handlePassRegisterPress()
              : () => {}
          }
          style={{ width: "40%", marginTop: 40 }}
        />
        <Pressable style={{ marginTop: 25 }} onPress={() => resendCode()}>
          <Text
            style={[
              styles.resend_text,
              {
                color: isAllowGetNewCode
                  ? COLOR.primary_blue_100
                  : COLOR.primary_blue_50,
                textDecorationLine: isAllowGetNewCode && "underline",
              },
            ]}
          >
            {isAllowGetNewCode
              ? "Gửi lại mã OTP"
              : `Gửi lại mã sau ${delaySeconds} giây`}
          </Text>
        </Pressable>
        {type !== "forgotPassword" && (
          <SecondaryButton
          text="Xác thực bằng mật khẩu"
          onPress={() => handleConfirmByPasswordPress()}
          style={{
            marginTop: 110,
            width: "80%",
          }}
        />
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 100,
  },

  back_button: {
    position: "absolute",
    top: 35,
    left: 15,
  },

  title_text: {
    fontSize: 30,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
  },

  content_text: {
    fontSize: 14,
    fontWeight: 400,
    color: COLOR.primary_blue_50,
    textAlign: "center",
    marginTop: 15,
  },

  resend_text: {
    fontSize: 16,
    fontWeight: 500,
  },
});

export default OTPScreen;
