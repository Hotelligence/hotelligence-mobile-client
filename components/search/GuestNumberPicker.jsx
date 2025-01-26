import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { User } from "lucide-react-native";

const GuestNumberPicker = ({ value, placeholder, style, isDisabled }) => {
  return (
    <Pressable disabled={isDisabled} style={[styles.container, style]}>
      <User size={24} color={COLOR.primary_blue_100} strokeWidth={2.5} />
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
    color: COLOR.primary_blue_100,
  },

  input: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },
});

export default GuestNumberPicker;
