import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { COLOR } from "@/assets/colors/Colors";

const InputField = ({ style, inputStyle, label, value, onChange }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={[styles.input, inputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },

  label: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
    fontWeight: 500,
  },

  input: {
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
  },
});

export default InputField;
