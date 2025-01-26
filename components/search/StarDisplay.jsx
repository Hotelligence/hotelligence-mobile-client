import React from "react";
import { View, StyleSheet } from "react-native";
import { Star } from "lucide-react-native";
import { COLOR } from "@/assets/colors/Colors";

const StarDisplay = ({ starCount = 5, size = 20, style }) => {
  return (
    <View style={[styles.container, style]}>
      {[...Array(starCount)].map((_, index) => (
        <Star
          key={index}
          size={size}
          fill={COLOR.primary_gold_120}
          color={COLOR.primary_gold_120}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});

export default StarDisplay;
