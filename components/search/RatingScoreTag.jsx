import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "@/assets/colors/Colors";

const RatingScoreTag = ({ ratingScore, style, fontSize = 18 }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, { fontSize: fontSize }]}>{ratingScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.primary_gold_120,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },

  text: {
    color: "#FFFFFF",
  },
});

export default RatingScoreTag;
