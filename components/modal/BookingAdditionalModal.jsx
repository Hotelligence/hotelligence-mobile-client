import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { CircleButton, DiscountTag, SubmitButton } from "@/components/search";
import { COLOR } from "@/assets/colors/Colors";
import { X, ChevronRight } from "lucide-react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { formatVND } from "@/utils/ValueConverter";

const BookingAdditionalModal = ({
  visible,
  onClose,
  additionalOptions,
  priceInfo,
  numOfNights,
  onBookingPress,
  onViewPriceDetailPress,
}) => {

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); 
  const [additionalFee, setAdditionalFee] = useState(0);

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const taxFee =
    ((priceInfo?.discountedPrice + additionalFee) * numOfNights) / priceInfo?.taxPercentage;
  const totalFee = (priceInfo?.discountedPrice + additionalFee) * numOfNights + taxFee;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleOptionSelect = (index, option) => {
    if(selectedOptionIndex === index){
      setSelectedOptionIndex(null);
      setSelectedOption(null);
      setAdditionalFee(0);
    } else{
      setSelectedOptionIndex(index);
      setSelectedOption(option);
      setAdditionalFee(option.optionPrice);
    }
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(selectedOption)}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <Pressable style={styles.dismiss_overlay} onPress={() => onClose(selectedOption)} />
        <Animated.View
          style={[
            styles.modal_container,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CircleButton diameter={30} Icon={X} size={24} onPress={onClose} />
            <Text style={styles.header_text}>Tùy chọn thêm</Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: COLOR.primary_blue_100,
                }}
              >
                Bổ sung
              </Text>
              <Text style={{ fontSize: 12, color: COLOR.primary_blue_100 }}>
                Giá mỗi đêm
              </Text>
            </View>
            {additionalOptions &&
              additionalOptions.map((option, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginVertical: 5 }}
                >
                  <View style={{ flexDirection: "row", width: "55%" }}>
                    <BouncyCheckbox
                      size={20}
                      fillColor={COLOR.primary_blue_100}
                      useBuiltInState={false}
                      isChecked={selectedOptionIndex === index}
                      onPress={() => handleOptionSelect(index, option)}
                    />
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.option_text}
                    >
                      {option?.optionName}
                    </Text>
                  </View>
                  <Text style={styles.price_text}>
                    + {formatVND(option.optionPrice)}đ
                  </Text>
                </View>
              ))}
            <View style={styles.divider} />
            <DiscountTag
              discount={priceInfo?.discountPercentage}
              style={{ alignSelf: "flex-start", marginTop: 5 }}
            />
            <View
              style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}
            >
              <View style={{ width: "75%" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.discount_price_text}>
                    {formatVND((priceInfo?.discountedPrice + additionalFee) * numOfNights)}đ
                  </Text>
                  <Text style={styles.origin_price_text}>
                    {formatVND((priceInfo?.originPrice + additionalFee) * numOfNights)}đ
                  </Text>
                </View>
                <Text style={styles.total_price_text}>
                  Tổng {formatVND((totalFee))}đ bao
                  gồm thuế và phí
                </Text>
                <Pressable
                  onPress={() => onViewPriceDetailPress(selectedOption)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.view_all_text}>Xem Chi tiết giá</Text>
                  <ChevronRight
                    size={16}
                    color={COLOR.primary_gold_120}
                    strokeWidth={2.25}
                  />
                </Pressable>
              </View>
              <SubmitButton
                text="Đặt"
                style={{ justifySelf: "flex-end", width: "25%", marginTop: 30 }}
                onPress={() => onBookingPress(selectedOption)}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  dismiss_overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  modal_container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  header_text: {
    fontSize: 20,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
    marginLeft: 16,
  },

  price_text: {
    fontWeight: 500,
    fontSize: 16,
    color: COLOR.primary_blue_100,
    marginStart: "auto",
  },

  option_text: {
    fontWeight: 400,
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: COLOR.primary_blue_50,
    marginVertical: 25,
  },

  view_all_text: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.primary_gold_120,
    textDecorationLine: "underline",
  },

  origin_price_text: {
    fontSize: 18,
    color: COLOR.primary_blue_50,
    textDecorationLine: "line-through",
    marginStart: 5,
  },

  discount_price_text: {
    fontWeight: 500,
    fontSize: 22,
    marginVertical: 2,
    color: COLOR.primary_blue_100,
  },

  total_price_text: {
    fontSize: 12,
    color: COLOR.primary_blue_50,
  },
});

export default BookingAdditionalModal;
