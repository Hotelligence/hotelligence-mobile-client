import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { Dropdown } from "react-native-element-dropdown";
import { Check } from "lucide-react-native";

const SortDropDown = ({
  options,
  labelField,
  valueField,
  value,
  placeholder,
  style,
  onChange,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <Dropdown
        data={options}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder_text}
        labelField="label"
        valueField="value"
        onChange={onChange}
        renderItem={(item, selected) => (
          <View style={styles.item}>
            <Text style={styles.item_text}>{item.label}</Text>
            {selected && (
              <Check
                size={18}
                color={COLOR.primary_blue_100}
                style={{ marginStart: "auto" }}
              />
            )}
          </View>
        )}
        style={styles.dropdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.primary_blue_100,
    borderRadius: 10,
    width: "100%",
  },

  placeholder_text: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

  dropdown: {
    padding: 10,
  },

  item: {
    flexDirection: "row",
    padding: 10,
  },

  item_text: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },
});

export default SortDropDown;
