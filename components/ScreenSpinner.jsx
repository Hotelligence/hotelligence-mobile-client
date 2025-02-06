import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { COLOR } from "@/assets/colors/Colors";

const ScreenSpinner = ({
  size = "large",
  color = COLOR.primary_gold_120,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScreenSpinner;
