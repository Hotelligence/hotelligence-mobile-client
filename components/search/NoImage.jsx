import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLOR } from "@/assets/colors/Colors";
import { ImageOff } from "lucide-react-native";

const NoImage = ({ iconSize = 48, style, ...props }) => {
  return (
    <View {...props} style={[styles.image_off_container, style]}>
      <ImageOff
        size={iconSize}
        color={COLOR.primary_blue_50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image_off_container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default NoImage;
