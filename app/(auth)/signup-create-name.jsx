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
import { ArrowLeft, } from "lucide-react-native";
import { useRouter } from "expo-router";

const SignUpCreateName = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nameHelperText, setNameHelperText] = useState(" ");

  const onBackPress = () => {
    router.back();
  };

  const handleContinuePress = async () => {
    router.push("/signup-create-password");
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
        <Text style={styles.title_text}>Tạo tên tài khoản</Text>
        <Text style={styles.content_text}>
          Tên tài khoản của Quý khách phải giống với tên trên giấy tờ tùy thân
          (như Căn cước công dân, Hộ chiếu)
        </Text>
        <View style={{ width: "100%", marginTop: 25, }}>
          <AuthInputField
            label="Họ và tên"
            value={name}
            onChangeText={(text) => setName(text)}
            isError={nameHelperText !== " "}
            helperText={nameHelperText}
          />
        </View>
        <SubmitButton
          text="Tiếp tục"
          onPress={() => handleContinuePress()}
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

export default SignUpCreateName;
