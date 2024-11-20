import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { User } from "@/assets/icons";

const GuestNumberPicker = ({ value, placeholder, style, isDisabled }) => {
  return (
    <Pressable disabled={isDisabled} style={[styles.container, style]}>
      <User fill={COLOR.primary_blue_100} width={24} height={24} />
      <View style={styles.content_container}>
        <Text style={styles.title}>Chọn số lượng khách</Text>
        <TextInput
          editable={!isDisabled}
          style={styles.input}
          placeholder={placeholder}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  content_container: {
    marginHorizontal: 6,
    flex: 1,
  },

  title: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 500,
  },

  input: {
    fontSize: 16,
  },
});

export default GuestNumberPicker;
