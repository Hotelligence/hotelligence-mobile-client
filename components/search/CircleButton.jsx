import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { COLOR } from "@/assets/colors/Colors";

const CircleButton = ({
  diameter = 30,
  Icon,
  size = 28,
  color = COLOR.primary_gold_120,
  backgroundColor = COLOR.primary_white_100,
  borderRadius = 20,
  isShadow = false,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={[
        isShadow ? styles.circle_with_shadow : styles.circle,
        style,
        {
          width: diameter,
          height: diameter,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
        },
      ]}
      onPress={onPress}
    >
      <Icon size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLOR.primary_white_100,
    justifyContent: "center",
    alignItems: "center",
  },

  circle_with_shadow: {
    backgroundColor: COLOR.primary_white_100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CircleButton;
