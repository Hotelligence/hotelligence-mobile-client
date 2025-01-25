import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { Discount } from "@/assets/icons";
import { TicketPercent } from "lucide-react-native";

const DiscountTag = ({ discount, style, fontSize = 12 }) => {
  return (
    <View style={[styles.container, style]}>
      <TicketPercent
        style={{ marginHorizontal: 5 }}
        size={16}
        color={COLOR.primary_white_100}
      />
      <Text style={[styles.text, { fontSize: fontSize }]}>
        Giảm {discount * 100}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.secondary_green_100,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },

  text: {
    color: "#FFFFFF",
    marginEnd: 5,
    fontWeight: 500,
  },
});

export default DiscountTag;
