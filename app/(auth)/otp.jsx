import React, { useState, useEffect, useCallback } from "react";
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
import { useSignIn, useSignUp } from "@clerk/clerk-expo";

const OTPScreen = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  //"signup", "login" and "forgotPassword"
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();

  const [otpInput, setOTPInput] = useState("");
  const [helperText, setHelperText] = useState(" ");
  const [isAllowGetNewCode, setIsAllowGetNewCode] = useState(false);
  const [delaySeconds, setDelaySeconds] = useState(30);
  const [buttonLoading, setButtonLoading] = useState(false);

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

  const handleOTPErrorDisplay = (err) => {
    if (err.errors[0]?.code === "form_code_incorrect") {
      setHelperText("Mã OTP không chính xác, vui lòng kiểm tra lại");
    } else {
      setHelperText(
        "Mã OTP đã hết hạn, vui lòng nhấn Gửi lại mã OTP để lấy một mã khác"
      );
    }
  };

  const handleLoginPress = useCallback(async (otpInput) => {
    setButtonLoading(true);
    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: otpInput,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        console.log("Login success"); //

        router.replace("/");
      }
    } catch (err) {
      handleOTPErrorDisplay(err);
      console.log(JSON.stringify(err, null, 2));
    } finally {
      setButtonLoading(false);
    }
  }, []);

  const handleSignUpPress = useCallback(async (otpInput) => {
    setButtonLoading(true);
    try {
      await signUp.attemptEmailAddressVerification({
        code: otpInput,
      });

      //If the email is verified, navigate to this screen, else it will jump to the catch block to handle error display
      router.push({
        pathname: "/signup-create-name",
      });
    } catch (err) {
      handleOTPErrorDisplay(err);
      console.log(JSON.stringify(err, null, 2));
    } finally {
      setButtonLoading(false);
    }
  }, []);

  const handlePassRegisterPress = async () => {
    router.replace("/password-reset");
  };

  const handleConfirmByPasswordPress = () => {
    router.replace({
      pathname: "/login-password",
    });
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
          disabled={otpInput.length < 6}
          isLoading={buttonLoading}
          text="Tiếp tục"
          onPress={
            type === "login"
              ? () => handleLoginPress(otpInput)
              : type === "signup"
              ? () => handleSignUpPress(otpInput)
              : type === "forgotPassword"
              ? () => handlePassRegisterPress(otpInput)
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

  helper_text: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 14,
    color: COLOR.tertiary_red_100,
    alignSelf: "flex-start",
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
