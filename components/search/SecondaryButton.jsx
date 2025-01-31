import { COLOR } from '@/assets/colors/Colors'
import { View, Text, Pressable, StyleSheet } from 'react-native'

const SecondaryButton = ({
  text,
  fontSize = 18,
  color = COLOR.primary_blue_100,
  style,
  disabled,
  isDisplayIcon,
  onPress,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style, { opacity: disabled ? 0.6 : 1, borderColor: color }]}
    >
      <Text style={[styles.text, { fontSize: fontSize, color: color }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLOR.primary_white_100,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_100,
  },

  text: {
    fontWeight: 700,
    color: COLOR.primary_blue_100,
    textAlign: "center"
  },

  icon: {},
});

export default SecondaryButton;