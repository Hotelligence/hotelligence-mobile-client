import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { ThirdPartyButton, AuthInputField } from "@/components/authentication";
import { SubmitButton } from "@/components/search";
import { useRouter } from "expo-router";

const AuthenticationScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState(" ");

  const handleContinuePress = async () => {
    router.push({
      pathname: "/otp",
      params: { type: "login" },
    });
  };

  const handleForgotPasswordPress = () => {
    router.push({
      pathname: "/otp",
      params: { type: "forgotPassword" }
    })
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={{ flex: 1, backgroundColor: COLOR.primary_white_100 }}
        keyboardDismissMode="interactive"
      >
        <Text style={styles.title_text}>Đăng ký/Đăng nhập</Text>
        <View style={{ width: "100%", marginVertical: 40 }}>
          <ThirdPartyButton
            text="Đăng nhập với Google"
            logo={require("@/assets/images/google-logo.png")}
          />
          <Text style={styles.split_text}>Hoặc</Text>
          <AuthInputField
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            isError={emailHelperText !== " "}
            helperText={emailHelperText}
          />
          <Pressable onPress={() => handleForgotPasswordPress()}>
            <Text
              style={[
                styles.content_text,
                { marginTop: 20, textAlign: "right" },
              ]}
            >
              Quên mật khẩu?
            </Text>
          </Pressable>
        </View>
        <SubmitButton
          text="Tiếp tục"
          onPress={() => handleContinuePress()}
          style={{ width: "40%" }}
        />
        <Text
          style={[styles.content_text, { textAlign: "center", marginTop: 20 }]}
        >
          Bằng việc tiếp tục, Quý khách đã đọc và đồng ý với{" "}
          <Text style={{ fontWeight: 500 }}>
            Điều khoản & Điều kiện, Tuyên bố bảo mật
          </Text>{" "}
          của Hotelligence.
        </Text>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 80,
  },

  title_text: {
    fontSize: 30,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
  },

  split_text: {
    fontSize: 18,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
    marginVertical: 15,
    textAlign: "center",
  },

  content_text: {
    fontSize: 14,
    fontWeight: 400,
    color: COLOR.primary_blue_100,
  },
});

export default AuthenticationScreen;
