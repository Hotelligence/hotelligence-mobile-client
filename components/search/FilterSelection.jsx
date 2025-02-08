import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLOR } from '@/assets/colors/Colors';

const FilterSelection = ({
  label,
  data,
  style,
  value,
  minWidth,
  renderItem,
  onSelect,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: value
            ? COLOR.tertiary_blue_40
            : COLOR.primary_white_100,
        },
      ]}
    >
      <Dropdown
        style={[styles.dropdown, { minWidth: minWidth }]}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={
          value
            ? `${label}: ${data.find((item) => item.value === value)?.label}`
            : label
        }
        value={value}
        onChange={onSelect}
        renderItem={renderItem}
        placeholderStyle={{ textAlign: "center" }}
        selectedTextStyle={{ textAlign: "center" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLOR.primary_blue_50,
    backgroundColor: COLOR.primary_white_100,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdown: {
    padding: 12,
    minWidth: 130,
    alignItems: "center",
  },

  item: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FilterSelection;