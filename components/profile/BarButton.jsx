import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { ChevronRight } from "lucide-react-native";
import { icons } from "lucide-react-native";

const BarButton = ({
  iconName,
  iconSize = 24,
  fontSize = 20,
  text,
  color = COLOR.primary_blue_50,
  style,
  onPress,
}) => {
  const Icon = icons[iconName];

  return (
    <Pressable onPress={onPress} style={[styles.container, style, { borderColor: color }]}>
      {Icon && (
        <Icon
          size={iconSize}
          color={color}
          strokeWidth={1.5}
          style={{ marginEnd: 8 }}
        />
      )}
      <Text
        style={{ color: color, fontSize: fontSize, fontWeight: 500 }}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {text}
      </Text>
        <ChevronRight size={24} color={color} strokeWidth={1.5} style={{ marginStart: "auto" }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLOR.primary_white_100,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default BarButton;
