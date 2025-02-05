import React from "react";
import { StyleSheet, Text, Image, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";

const ThirdPartyButton = ({ text, logo, fontSize = 18, logoSize = 24, style, onPress }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Image source={logo} style={[styles.logo, { width: logoSize, height: logoSize,}]} />
      <Text style={[styles.text, { fontSize: fontSize}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    backgroundColor: COLOR.primary_white_100,
    elevation: 2,
  },

  logo: {
    marginRight: 20,
  },

  text: {
    fontWeight: 500,
    color: COLOR.primary_blue_100,
  },
});

export default ThirdPartyButton;
