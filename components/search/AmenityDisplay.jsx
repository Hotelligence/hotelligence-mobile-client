import { View, Text } from "react-native";
import { icons } from "lucide-react-native";
import React from "react";
import { COLOR } from "@/assets/colors/Colors";

const AmenityDisplay = ({
  iconName,
  iconSize = 16,
  fontSize = 16,
  fontWeight = 400,
  label,
  color = COLOR.primary_blue_100,
  style,
}) => {
  const Icon = icons[iconName];

  return (
    <View style={[style, { flexDirection: "row", alignItems: "center" }]}>
      {Icon && (
        <Icon
          size={iconSize}
          color={color}
          strokeWidth={2.5}
          style={{ marginEnd: 5 }}
        />
      )}
      <Text
        style={{ color: color, fontSize: fontSize, fontWeight: fontWeight }}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

export default AmenityDisplay;
