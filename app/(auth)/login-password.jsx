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
import {
  SubmitButton,
  SecondaryButton,
  CircleButton,
} from "@/components/search";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const LoginByPassword = () => {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  const [password, setPassword] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState(" ");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onBackPress = () => {
    router.back();
  };

  const handleConfirmByOTPPress = () => {
    router.replace({
      pathname: "/otp",
      params: { type: "login" },
    });
  };

  const onSignInPress = useCallback(async (password) => {
    setButtonLoading(true);
    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "password",
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      if (err.errors[0]?.code === "form_password_incorrect") {
        setPasswordHelperText(
          "Mật khẩu đã nhập không chính xác, vui lòng kiểm tra"
        );
      } else {
        setPasswordHelperText("Đã có lỗi xảy ra, vui lòng thử lại");
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
        <Text style={styles.title_text}>Xác thực bằng mật khẩu</Text>
        <View style={{ width: "100%", marginTop: 25, gap: 5 }}>
          <AuthInputField
            label="Email"
            editable={false}
            value={signIn.identifier}
            helperText={" "}
          />
          <AuthInputField
            secureTextEntry={!isPasswordVisible}
            label="Mật khẩu"
            value={password}
            onChangeText={(text) => setPassword(text)}
            isError={passwordHelperText !== " "}
            helperText={passwordHelperText}
            Icon={isPasswordVisible ? EyeOff : Eye}
            onIconPress={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          />
        </View>
        <SubmitButton
          text="Đăng nhập"
          disabled={password.length <= 0}
          isLoading={buttonLoading}
          onPress={() => onSignInPress(password)}
          style={{ width: "40%", marginTop: 40 }}
        />
        <SecondaryButton
          text="Xác nhận bằng OTP qua Email"
          onPress={handleConfirmByOTPPress}
          style={{
            marginTop: 130,
            width: "80%",
          }}
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
});

export default LoginByPassword;
