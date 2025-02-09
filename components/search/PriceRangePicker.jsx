import { StyleSheet, Text, View, Pressable } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { COLOR } from "@/assets/colors/Colors";

const PriceRangePicker = ({
  filterCategory,
  filterTruncatedContent,
  style,
  disabled,
  onPress,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        style,
        {
          backgroundColor: filterTruncatedContent !== ""
            ? COLOR.tertiary_blue_40
            : COLOR.primary_white_100,
        },
      ]}
    >
      <Text style={[styles.filter_text, { marginHorizontal: 5, }]}>
        {filterCategory}
      </Text>
      {filterTruncatedContent !== "" && (
        <Text style={styles.filter_text}>({filterTruncatedContent})</Text>
      )}
      <ChevronDown size={20} color={COLOR.primary_blue_100} strokeWidth={2.5} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },

  filter_text: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },
});

export default PriceRangePicker;
