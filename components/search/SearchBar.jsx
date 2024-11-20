import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { Map } from "@/assets/icons";

const SearchBar = ({ value, placeholder, style, isDisabled }) => {
  return (
    <Pressable disabled={isDisabled} style={[styles.container, style]}>
      <Map fill={COLOR.primary_blue_100} width={24} height={24} />
      <TextInput editable={!isDisabled} style={styles.input} placeholder={placeholder} />
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

  input: {
    marginHorizontal: 6,
    flex: 1,
    fontSize: 18,
  },

});

export default SearchBar;
