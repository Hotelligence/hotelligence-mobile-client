import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLOR } from "@/assets/colors/Colors";

const ReviewCategoryDisplay = ({ style, point, categoryName }) => {
  return (
    <View style={style}>
      <Text style={styles.category_point_text}>{point}/10</Text>
      <Text ellipsizeMode="tail" numberOfLines={2} style={styles.category_name_text}>{categoryName}</Text>
    </View>
  );
};

const DetailReviewPoint = ({
  overallPoint,
  reviewCount,
  pointCategory,
  cleanPoint,
  servicePoint,
  staffPoint,
  facilityPoint,
  environmentPoint,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.average_point_container}>
        <Text style={styles.overall_point_text}>{overallPoint}</Text>
        <View style={{ paddingVertical: 20, marginStart: 8, }}>
          <Text style={styles.category_text}>{pointCategory}</Text>
          <Text style={styles.review_count_text}>{reviewCount} nhận xét</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", }}>
        <ReviewCategoryDisplay style={{ flex: 1, }} point={cleanPoint} categoryName={"Sạch sẽ"} />
        <ReviewCategoryDisplay style={{ flex: 1, }}
          point={servicePoint}
          categoryName={"Tiện nghi, dịch vụ"}
        />
        <ReviewCategoryDisplay style={{ flex: 1, }} point={staffPoint} categoryName={"Nhân viên"} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 10, }}>
        <ReviewCategoryDisplay style={{ flex: 1, }}
          point={facilityPoint}
          categoryName={"Điều kiện & cơ sở vật chất"}
        />
        <ReviewCategoryDisplay style={{ flex: 1, }}
          point={environmentPoint}
          categoryName={"Thân thiện với môi trường"}
        />
        <View style={{ flex: 1, }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLOR.primary_white_100,
  },

  average_point_container: {
    flexDirection: "row",
    alignItems: "center",
  },

  overall_point_text: {
    color: COLOR.primary_gold_120,
    fontSize: 40,
    fontWeight: 600,
  },

  category_text: {
    color: COLOR.primary_gold_120,
    fontSize: 16,
    fontWeight: 500,
  },

  review_count_text: {
    color: COLOR.primary_blue_100,
    fontSize: 14,
    fontWeight: 500,
  },

  category_point_text: {
    color: COLOR.primary_blue_100,
    fontSize: 18,
    fontWeight: 500,
  },

  category_name_text: {
    color: COLOR.primary_blue_100,
    fontSize: 12,
    fontWeight: 400,
  },
});

export default DetailReviewPoint;
