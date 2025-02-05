import { COLOR } from "@/assets/colors/Colors";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SubmitButton = ({
  text,
  fontSize = 18,
  color = COLOR.primary_gold_100,
  style,
  disabled,
  isDisplayIcon,
  isLoading,
  onPress,
}) => {
  return (
    <Pressable
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[styles.container, style, { opacity: disabled || isLoading ? 0.6 : 1 }]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLOR.primary_gold_120} />
      ) : (
        <Text style={[styles.text, { fontSize: fontSize, color: color }]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLOR.primary_blue_100,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  text: {
    fontWeight: 700,
    color: COLOR.primary_gold_100,
    textAlign: "center",
  },

  icon: {},
});

export default SubmitButton;
