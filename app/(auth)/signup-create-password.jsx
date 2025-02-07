import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { AuthInputField } from "@/components/authentication";
import { SubmitButton, CircleButton } from "@/components/search";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const SignUpCreatePassword = () => {
  const router = useRouter();
  const { signUp, setActive } = useSignUp();

  const [password, setPassword] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState(" ");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState(" ");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  const onBackPress = () => {
    router.back();
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/;

  const handleContinuePress = useCallback(async (password, confirmPassword) => {
    setButtonLoading(true);
    try {
      if (!passwordRegex.test(password)) {
        setPasswordHelperText("Mật khẩu không hợp lệ, vui lòng kiểm tra");
      } else if (confirmPassword !== password) {
        setConfirmPasswordHelperText(
          "Mật khẩu đã nhập không trùng khớp, vui lòng kiểm tra"
        );
      } else {
        const completeSignUp = await signUp.update({ password: password });

        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          router.replace("/");
        }
      }
    } catch (err) {
      if (err.errors[0]?.code === "form_password_pwned"){
        setPasswordHelperText(
          "Mật khẩu yếu, vui lòng chọn một mật khẩu khác"
        );
        setConfirmPasswordHelperText("Mật khẩu yếu, vui lòng chọn một mật khẩu khác")
      }
      else{
        setPasswordHelperText("Đã có lỗi xảy ra, vui lòng thử lại");
        setConfirmPasswordHelperText("Đã có lỗi xảy ra, vui lòng thử lại");
      }
      console.log(JSON.stringify(err, null, 2));
    } finally {
      setButtonLoading(false);
    }
  }, []);

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
        <Text style={styles.title_text}>Tạo mật khẩu</Text>
        <Text style={styles.content_text}>
          Mật khẩu từ 8-32 kí tự, trong đó ít nhất có 01 chữ cái in hoa và 01
          chữ số.
        </Text>
        <View style={{ width: "100%", marginTop: 25 }}>
          <AuthInputField
            secureTextEntry={!isPasswordVisible}
            label="Mật khẩu"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordHelperText(" ");
            }}
            isError={passwordHelperText !== " "}
            helperText={passwordHelperText}
            Icon={isPasswordVisible ? EyeOff : Eye}
            onIconPress={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          />
          <AuthInputField
            secureTextEntry={!isConfirmPasswordVisible}
            label="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordHelperText(" ");
            }}
            isError={confirmPasswordHelperText !== " "}
            helperText={confirmPasswordHelperText}
            Icon={isConfirmPasswordVisible ? EyeOff : Eye}
            onIconPress={() => {
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
            }}
            style={{ marginTop: 5 }}
          />
        </View>
        <SubmitButton
          disabled={password.length === 0 || confirmPassword.length === 0}
          isLoading={buttonLoading}
          text="Tiếp tục"
          onPress={() => handleContinuePress(password, confirmPassword)}
          style={{ width: "40%", marginTop: 40 }}
        />
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
});

export default SignUpCreatePassword;
