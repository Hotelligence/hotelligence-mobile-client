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

const DetailPriceModal = ({
  visible,
  onClose,
  priceDetails = [],
  onBookingPress,
}) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const tempPriceDetails = [
    //use priceDetails instead of tempPriceDetails later
    {
      id: "0",
      name: "1 đêm",
      price: 1000000,
    },
    {
      id: "1",
      name: "Thuế",
      price: 100000,
    },
    {
      id: "2",
      name: "Phí khác",
      price: 1500000,
    },
  ];

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

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <Pressable style={styles.dismiss_overlay} onPress={onClose} />
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
            <Text style={styles.header_text}>Chi tiết giá</Text>
          </View>
          <View>
            <View style={{ marginTop: 20 }}>
              {tempPriceDetails.map((item) => (
                <View
                  key={item.id}
                  style={{ flexDirection: "row", marginVertical: 5 }}
                >
                  <Text style={styles.option_text}>{item.name}</Text>
                  <Text style={styles.price_text}>
                    {formatVND(item.price)}đ
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.divider} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: COLOR.primary_gold_120,
                }}
              >
                Tổng
              </Text>
              <Text style={styles.price_text}>{formatVND(2600000)}đ</Text>
            </View>
            <SubmitButton
              text="Đặt"
              style={{ marginBottom: 20, marginTop: 40, }}
              onPress={() => onBookingPress()}
            />
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

export default DetailPriceModal;
