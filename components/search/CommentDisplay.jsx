import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLOR } from "@/assets/colors/Colors";

const CommentDisplay = ({
  overallPoint,
  pointCategory,
  comment,
  reviewDate,
  userName,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.point_text}>
        {overallPoint}/10 - {pointCategory}
      </Text>
      <Text style={styles.date_review_text}>{reviewDate}</Text>
      <Text style={styles.comment_text}>{comment}</Text>
      <Text style={styles.user_name_text}>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLOR.primary_white_100,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
  },

  point_text: {
    fontSize: 18,
    color: COLOR.primary_gold_120,
    fontWeight: 500,
  },

  date_review_text: {
    marginTop: 2,
    fontSize: 12,
    color: COLOR.primary_blue_100,
    fontWeight: 400,
  },

  comment_text: {
    marginTop: 10,
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

  user_name_text: {
    marginBottom: 10,
    fontSize: 12,
    color: COLOR.primary_blue_100,
    fontWeight: 400,
  },
});

export default CommentDisplay;
