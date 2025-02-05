import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { ThirdPartyButton, AuthInputField } from "@/components/authentication";
import { SubmitButton } from "@/components/search";
import { useRouter } from "expo-router";
import { useSignUp, useSignIn, useSSO } from "@clerk/clerk-expo";

const AuthenticationScreen = () => {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState(" ");
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleEmailErrorDisplay = (err) => {
    if (err.errors[0]?.code === "form_param_nil") {
      setEmailHelperText("Vui lòng nhập email");
    } else if (err.errors[0].code === "form_param_format_invalid") {
      setEmailHelperText("Emai không hợp lệ");
    } else {
      setEmailHelperText("Đã xảy ra lỗi, vui lòng thử lại");
    }
  };

  const handleContinuePress = useCallback(async (email) => {
    setEmailHelperText(" ");
    setButtonLoading(true);
    try {
      await signUp.create({ emailAddress: email });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push({
        pathname: "/otp",
        params: { type: "signup" },
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      const errorCode = err.errors[0].code;
      if (errorCode === "form_identifier_exists") {
        const { supportedFirstFactors } = await signIn.create({
          identifier: email,
        });

        const firstEmailFactor = supportedFirstFactors.find((factor) => {
          return factor.strategy === "email_code";
        });

        const { emailAddressId } = firstEmailFactor;

        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });

        router.push({
          pathname: "/otp",
          params: { type: "login" },
        });
      } else {
        handleEmailErrorDisplay(err);
      }
    } finally {
      setButtonLoading(false);
    }
  }, []);

  const handleGoogleOAuthPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

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
            onPress={handleGoogleOAuthPress}
          />
          <Text style={styles.split_text}>Hoặc</Text>
          <AuthInputField
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmailHelperText(" ");
              setEmail(text);
            }}
            isError={emailHelperText !== " "}
            helperText={emailHelperText}
          />
        </View>
        <SubmitButton
          text="Tiếp tục"
          disabled={email.length <= 0}
          isLoading={buttonLoading}
          onPress={() => handleContinuePress(email)}
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
