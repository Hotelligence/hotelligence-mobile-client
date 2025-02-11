import {
  View,
  Text,
  Platform,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { CalendarDays } from "lucide-react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { isoStringToTruncatedDate, dateString, dateStringToTruncatedDate, dateObjectToTruncatedDate } from "@/utils/ValueConverter";

const DatePicker = ({
  label,
  value,
  placeholder,
  display,
  style,
  disabled,
  datePickerVisible,
  onPress,
  onChange,
  onOutsideModalPress,
  ...props
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        disabled={disabled}
        style={[styles.container, style]}
        onPress={onPress}
      >
        <CalendarDays
          size={24}
          color={COLOR.primary_blue_100}
          strokeWidth={2.5}
        />
        <View style={styles.content_container}>
          <Text style={styles.title}>{label}</Text>
          {!value ? (
            <Text style={styles.placeholder_text} placeholder={placeholder}>
              {placeholder}
            </Text>
          ) : (
            <Text style={styles.text}>{dateObjectToTruncatedDate(value)}</Text>
          )}
        </View>
      </Pressable>
      {/* The RNDateTimePicker on Android default is a Modal itself, but on IOS it is not so need to wrap it inside a Modal to achieve the Modal UI */}
      {datePickerVisible && (
        <>
          {Platform.OS === "ios" ? (
            <Modal
              animationType="fade"
              visible={datePickerVisible}
              transparent={true}
            >
              <Pressable
                style={styles.modal_overlay}
                onPress={onOutsideModalPress}
              >
                <View style={styles.modal_view}>
                  <RNDateTimePicker
                    value={value}
                    mode="date"
                    display={display}
                    onChange={onChange}
                    {...props}
                  />
                </View>
              </Pressable>
            </Modal>
          ) : (
            <RNDateTimePicker
              value={value}
              mode="date"
              display={display}
              onChange={onChange}
              {...props}
            />
          )}
        </>
      )}
    </View>
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
});

export default DatePicker;
