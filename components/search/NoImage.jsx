import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ImageOff } from "@/assets/icons";
import { COLOR } from "@/assets/colors/Colors";

const NoImage = ({ iconSize = 48, style, ...props }) => {
  return (
    <View {...props} style={[styles.image_off_container, style]}>
      <ImageOff
        width={iconSize}
        height={iconSize}
        stroke={COLOR.primary_blue_50}
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
