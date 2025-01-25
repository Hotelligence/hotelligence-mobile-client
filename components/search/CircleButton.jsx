import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "@/assets/colors/Colors";

const CircleButton = ({
  diameter = 35,
  Icon,
  size = 32,
  color = COLOR.primary_gold_120,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={[styles.circle, style, { width: diameter, height: diameter }]}
      onPress={onPress}
    >
      <Icon width={size} height={size} fill={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 20,
    backgroundColor: COLOR.primary_white_100,
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});

export default CircleButton;
