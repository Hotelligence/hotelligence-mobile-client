import React, { useState, useEffect } from "react";
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
  CircleButton,
} from "@/components/search";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";

const PasswordReset = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState(" ");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const onBackPress = () => {
    router.back();
  };
  
  const handleResetPassPress = async () => {

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
        <Text style={styles.title_text}>Tạo mật khẩu mới</Text>
        <Text style={styles.content_text}>
          Mật khẩu từ 8-32 kí tự, trong đó ít nhất có 01 chữ cái in hoa, 01 kí
          tự đặc biệt và 01 chữ số.
        </Text>
        <View style={{ width: "100%", marginTop: 25, gap: 5 }}>
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
          <AuthInputField
            secureTextEntry={!isConfirmPasswordVisible}
            label="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            isError={confirmPasswordHelperText !== " "}
            helperText={confirmPasswordHelperText}
            Icon={isConfirmPasswordVisible ? EyeOff : Eye}
            onIconPress={() => {
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
            }}
          />
        </View>
        <SubmitButton
          text="Tạo"
          onPress={() => handleResetPassPress()}
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

export default PasswordReset;
