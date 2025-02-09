import { COLOR } from "@/assets/colors/Colors";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Pencil } from "lucide-react-native";

const SearchInfoCard = ({
  searchKeyword,
  period,
  numOfGuest,
  style,
  disabled,
  onPress,
  onEditPress,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View>
        <Text style={styles.search_keyword_text}>{searchKeyword}</Text>
        <View style={{ flexDirection: "row" }}>
          {period !== "" && (
            <>
              <Text
                style={styles.general_text}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {period}
              </Text>
            </>
          )}
          {numOfGuest !== "0" && (
            <Text
              style={[
                styles.general_text,
                { marginStart: period === "" ? 0 : 20 },
              ]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {numOfGuest} khách
            </Text>
          )}
        </View>
      </View>
      <Pressable style={{ marginStart: "auto" }} onPress={onEditPress}>
        <Pencil strokeWidth={2.5} color={COLOR.primary_blue_100} />
      </Pressable>
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
