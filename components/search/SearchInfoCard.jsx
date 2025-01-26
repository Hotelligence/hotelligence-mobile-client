import { COLOR } from "@/assets/colors/Colors";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Pencil } from "lucide-react-native";

const SearchInfoCard = ({ searchKeyword, period, numOfGuestRoom, style, disabled, onPress }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View>
        <Text style={styles.search_keyword_text}>{searchKeyword}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={styles.general_text}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            01 thg 11 - 03 thg 11
          </Text>
          <Text
            style={[styles.general_text, { marginStart: 20 }]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {numOfGuestRoom?.numOfGuest} khách | {numOfGuestRoom?.numOfRoom}{" "}
            phòng
          </Text>
        </View>
      </View>
      <Pencil strokeWidth={2.5} color={COLOR.primary_blue_100} style={{ marginStart: "auto" }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 15,
    padding: 14,
  },

  search_keyword_text: {
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 5,
    color: COLOR.primary_blue_100,
  },
  
  general_text: {
    fontSize: 14,
    color: COLOR.primary_blue_50,
  }

});

export default SearchInfoCard;
