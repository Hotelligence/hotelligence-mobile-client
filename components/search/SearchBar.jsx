import { TextInput, StyleSheet, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { MapPin } from "lucide-react-native";

const SearchBar = ({ value, placeholder, style, isDisabled, onChangeText }) => {
  return (
    <Pressable disabled={isDisabled} style={[styles.container, style]}>
      <MapPin
        size={24}
        color={COLOR.primary_white_100}
        strokeWidth={2}
        fill={COLOR.primary_blue_100}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={!isDisabled}
        style={styles.input}
        placeholder={placeholder}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  input: {
    marginHorizontal: 6,
    flex: 1,
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },
});

export default SearchBar;
