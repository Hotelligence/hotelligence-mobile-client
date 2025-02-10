import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { COLOR } from "@/assets/colors/Colors";
import { formatVND } from "@/utils/ValueConverter";

const PriceSlider = ({
  minValue,
  maxValue,
  values = [minValue, maxValue],
  onValuesChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label_text}>Giá mỗi đêm</Text>
      <View style={styles.label_container}>
        <Text style={styles.price_text}>{formatVND(values[0])}đ</Text>
        <Text style={styles.price_text}>{formatVND(values[1])}đ</Text>
      </View>
      <MultiSlider
        values={values}
        min={minValue}
        max={maxValue}
        step={200000}
        allowOverlap={false}
        onValuesChange={onValuesChange}
        selectedStyle={{
          backgroundColor: COLOR.primary_blue_100,
          height: 3,
        }}
        unselectedStyle={{
          backgroundColor: COLOR.primary_blue_50,
          height: 1,
        }}
        markerStyle={{
          backgroundColor: COLOR.primary_white_100,
          height: 32,
          width: 32,
          borderWidth: 1,
          borderColor: COLOR.primary_blue_100,
        }}
      />
    </View>
  );
};

const PriceSliderModal = ({
  visible,
  minValue = 0,
  maxValue = 10000000,
  values,
  onOutsideModalPress,
}) => {
  const [priceRange, setPriceRange] = useState(values);

  const handleValuesChange = (values) => {
    setPriceRange(values);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <Pressable style={styles.modal_overlay} onPress={() => onOutsideModalPress(priceRange)}>
        <View style={styles.modal_view}>
          <PriceSlider
            minValue={minValue}
            maxValue={maxValue}
            values={priceRange ? priceRange : [minValue, maxValue]}
            onValuesChange={handleValuesChange}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal_view: {
    backgroundColor: COLOR.primary_white_100,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  container: {
    padding: 20,
  },

  label_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  price_text: {
    fontSize: 14,
    color: COLOR.primary_blue_100,
  },

  label_text: {
    fontSize: 16,
    fontWeight: 600,
    color: COLOR.primary_gold_120,
    marginBottom: 10,
  }
});

export default PriceSliderModal;
