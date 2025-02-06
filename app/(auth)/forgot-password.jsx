import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { AuthInputField } from "@/components/authentication";
import { SubmitButton, CircleButton } from "@/components/search";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { OtpInput } from "react-native-otp-entry";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const PasswordReset = () => {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordHelperText, setNewPasswordHelperText] = useState(" ");
  useState(" ");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  useState(false);

  const [otpInput, setOTPInput] = useState("");
  const [otpHelperText, setOTPHelperText] = useState(" ");
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

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/;
  const handleResetPassPress = useCallback(async (otpInput, newPassword) => {
    setButtonLoading(true);
    try {
      if (!passwordRegex.test(newPassword)) {
        setNewPasswordHelperText("Mật khẩu không hợp lệ, vui lòng kiểm tra");
      } else {
        const resetPass = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: otpInput,
          password: newPassword,
        });

        if (resetPass.status === "complete") {
          await setActive({ session: resetPass.createdSessionId });
          router.replace("/");
        }
      }
    } catch (err) {
      if (err.errors[0]?.code === "form_password_pwned") {
        setNewPasswordHelperText("Mật khẩu yếu, hãy chọn một mật khẩu khác");
      } else if (err.errors[0]?.code === "form_code_incorrect") {
        setOTPHelperText("Mã OTP không chính xác, vui lòng kiểm tra lại");
      } else {
        setNewPasswordHelperText("Đã có lỗi xảy ra, vui lòng thử lại");
        setOTPHelperText("Đã có lỗi xảy ra, vui lòng thử lại");
      }
      console.log(JSON.stringify(err, null, 2));
    } finally {
      setButtonLoading(false);
    }
  }, []);

  const handleResendCodePress = async () => {
    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: signIn.identifier,
      });

      const firstEmailFactor = supportedFirstFactors.find((factor) => {
        return factor.strategy === "email_code";
      });
      const { emailAddressId } = firstEmailFactor;

      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId,
      });

      setIsAllowGetNewCode(false);
      setDelaySeconds(30);
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
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
        <Text style={styles.title_text}>Quên mật khẩu</Text>
        <Text style={styles.content_text}>
          Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email
          này trong hộp thư đến, hãy kiểm tra hộp thư rác
        </Text>
        <OtpInput
          numberOfInputs={6}
          focusColor={COLOR.secondary_green_100}
          onTextChange={(text) => {
            setOTPInput(text);
            setOTPHelperText(" ");
          }}
          theme={{
            containerStyle: { marginTop: 30 },
            pinCodeContainerStyle: {
              backgroundColor: "#D9D9D9",
              width: 55,
              height: 65,
              borderColor:
                otpHelperText !== " "
                  ? COLOR.tertiary_red_100
                  : COLOR.primary_white_100,
            },
          }}
        />
        <Text style={styles.helper_text}>{otpHelperText}</Text>
        <Pressable style={{ marginTop: 25 }} onPress={handleResendCodePress}>
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
        <Text style={styles.content_text}>
          Mật khẩu từ 8-32 kí tự, trong đó ít nhất có 01 chữ cái in hoa, 01 kí
          tự đặc biệt và 01 chữ số.
        </Text>
        <View style={{ width: "100%", marginTop: 25, gap: 5 }}>
          <AuthInputField
            secureTextEntry={!isNewPasswordVisible}
            label="Mật khẩu mới"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setNewPasswordHelperText(" ");
            }}
            isError={newPasswordHelperText !== " "}
            helperText={newPasswordHelperText}
            Icon={isNewPasswordVisible ? EyeOff : Eye}
            onIconPress={() => {
              setIsNewPasswordVisible(!isNewPasswordVisible);
            }}
          />
        </View>
        <SubmitButton
          disabled={newPassword.length === 0 || otpInput.length < 6}
          isLoading={buttonLoading}
          text="Đổi mật khẩu"
          onPress={() => handleResetPassPress(otpInput, newPassword)}
          style={{ width: "50%", marginTop: 40 }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 70,
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

  helper_text: {
    marginLeft: 15,
    fontSize: 14,
    color: COLOR.tertiary_red_100,
    alignSelf: "flex-start",
  },

  resend_text: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 20,
  },
});

export default PasswordReset;
