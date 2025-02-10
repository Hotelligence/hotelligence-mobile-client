import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { User } from "lucide-react-native";
import { useState } from "react";

const GuestPickerModal = ({
  modalVisible,
  numOfAdult,
  numOfChild,
  onOutsideModalPress,
  onAdultDecrement,
  onAdultIncrement,
  onChildDecrement,
  onChildIncrement,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable style={styles.modal_overlay} onPress={onOutsideModalPress}>
        <View style={styles.modal_view}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.text, { flex: 1.5, fontWeight: 600 }]}>
              Người lớn
            </Text>
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Pressable
                style={[
                  styles.adjust_button,
                  { opacity: numOfAdult === 0 ? 0.4 : 1 },
                ]}
                onPress={onAdultDecrement}
                disabled={numOfAdult === 0}
              >
                <Text style={[styles.text, { fontSize: 24 }]}>-</Text>
              </Pressable>
              <Text style={[styles.text, { flex: 1, textAlign: "center" }]}>
                {numOfAdult}
              </Text>
              <Pressable
                style={styles.adjust_button}
                onPress={onAdultIncrement}
              >
                <Text style={[styles.text, { fontSize: 24 }]}>+</Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={[styles.text, { flex: 1.5, fontWeight: 600 }]}>
              Trẻ em (dưới 12 tuổi)
            </Text>
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Pressable
                style={[
                  styles.adjust_button,
                  { opacity: numOfChild === 0 ? 0.4 : 1 },
                ]}
                onPress={onChildDecrement}
                disabled={numOfChild === 0}
              >
                <Text style={[styles.text, { fontSize: 24 }]}>-</Text>
              </Pressable>
              <Text style={[styles.text, { flex: 1, textAlign: "center" }]}>
                {numOfChild}
              </Text>
              <Pressable
                style={styles.adjust_button}
                onPress={onChildIncrement}
              >
                <Text style={[styles.text, { fontSize: 24 }]}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const GuestNumberPicker = ({
  placeholder,
  style,
  disabled,
  numOfAdult,
  numOfChild,
  modalVisible,
  onPress,
  onOutsideModalPress,
}) => {
  //The parents of this component is very large, so managing increment state locally will reduce the re-rendering of them.
  const [adults, setAdults] = useState(numOfAdult);
  const [children, setChildren] = useState(numOfChild);

  const handleAdultDecrement = () => {
    if (adults !== 0) setAdults(adults - 1);
  };

  const handleAdultIncrement = () => {
    setAdults(adults + 1);
  };

  const handleChildrenDecrement = () => {
    if (children !== 0) setChildren(children - 1);
  };

  const handleChildrenIncrement = () => {
    setChildren(children + 1);
  };

  return (
    <Pressable
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <GuestPickerModal
        modalVisible={modalVisible}
        onOutsideModalPress={() => onOutsideModalPress(adults, children)}
        numOfAdult={adults}
        numOfChild={children}
        onAdultDecrement={handleAdultDecrement}
        onAdultIncrement={handleAdultIncrement}
        onChildDecrement={handleChildrenDecrement}
        onChildIncrement={handleChildrenIncrement}
      />
      <User size={24} color={COLOR.primary_blue_100} strokeWidth={2.5} />
      <View style={styles.content_container}>
        <Text style={styles.title}>Chọn số lượng khách</Text>
        {numOfAdult === 0 ? (
          <Text style={styles.placeholder_text} placeholder={placeholder}>
            {placeholder}
          </Text>
        ) : (
          <Text style={styles.text}>
            {numOfAdult !== 0 && <Text>{numOfAdult} người lớn</Text>}
            {numOfChild !== 0 && <Text>, {numOfChild} trẻ em</Text>}
          </Text>
        )}
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
    paddingVertical: 8,
    paddingHorizontal: 4,
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

  placeholder_text: {
    fontSize: 14,
    color: COLOR.primary_blue_50,
  },

  text: {
    fontSize: 14,
    color: COLOR.primary_blue_100,
  },

  modal_overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal_view: {
    marginHorizontal: 20,
    backgroundColor: COLOR.primary_white_100,
    borderRadius: 20,
    padding: 30,
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

  adjust_button: {
    width: 36,
    height: 36,
    borderColor: COLOR.primary_blue_50,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GuestNumberPicker;
