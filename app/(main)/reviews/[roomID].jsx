import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { COLOR } from "@/assets/colors/Colors";
import { SubmitButton } from "@/components/search";
import { useRouter } from "expo-router";
import GeneralHeader from "@/components/GeneralHeader";

const RatingSlider = ({
  label,
  value,
  onChange,
  onStartSliding,
  onEndSliding,
}) => (
  <View style={styles.slider_container}>
    <View style={styles.label_container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}/10</Text>
    </View>
    <MultiSlider
      values={[value]}
      min={1}
      max={10}
      step={1}
      snapped
      //   smoothSnapped
      sliderLength={Dimensions.get("window").width - 40}
      onValuesChange={(values) => onChange(values[0])}
      selectedStyle={{
        backgroundColor: COLOR.primary_blue_100,
        height: 3,
      }}
      unselectedStyle={{
        backgroundColor: COLOR.primary_blue_50,
        height: 1,
      }}
      containerStyle={{}}
      onValuesChangeStart={onStartSliding}
      onValuesChangeFinish={onEndSliding}
    />
  </View>
);

const RoomReview = ({}) => {
  const router = useRouter();

  const [ratings, setRatings] = useState({
    cleanliness: 5,
    comfort: 5,
    staff: 5,
    facilities: 5,
    environmentFriendly: 5,
  });
  const [comment, setComment] = useState("");
  const [isSliding, setIsSliding] = useState(false);


  const handleSubmit = (ratings, comment) => {
    console.log("Ratings: ", ratings);
    console.log("Comment: ", comment);
  };

  const onBackPress = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: COLOR.primary_white_100 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <GeneralHeader onBackPress={onBackPress} title="Đánh giá phòng" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={!isSliding}
      >
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <RatingSlider
            label="Vệ sinh"
            value={ratings.cleanliness}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, cleanliness: value }))
            }
            onStartSliding={() => setIsSliding(true)}
            onEndSliding={() => setIsSliding(false)}
          />
          <RatingSlider
            label="Thoải mái"
            value={ratings.comfort}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, comfort: value }))
            }
            onStartSliding={() => setIsSliding(true)}
            onEndSliding={() => setIsSliding(false)}
          />
          <RatingSlider
            label="Nhân viên"
            value={ratings.staff}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, staff: value }))
            }
            onStartSliding={() => setIsSliding(true)}
            onEndSliding={() => setIsSliding(false)}
          />
          <RatingSlider
            label="Tiện nghi"
            value={ratings.facilities}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, facilities: value }))
            }
            onStartSliding={() => setIsSliding(true)}
            onEndSliding={() => setIsSliding(false)}
          />
          <RatingSlider
            label="Thân thiện với môi trường"
            value={ratings.environmentFriendly}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, environmentFriendly: value }))
            }
            onStartSliding={() => setIsSliding(true)}
            onEndSliding={() => setIsSliding(false)}
          />
        </View>

        <TextInput
          style={styles.comment_input}
          placeholder="Nhận xét của bạn về phòng..."
          multiline
          numberOfLines={4}
          maxLength={200}
          value={comment}
          onChangeText={setComment}
          scrollEnabled={true}
        />

        <SubmitButton
          text="Gửi đánh giá"
          onPress={() => handleSubmit(ratings, comment)}
          style={{ marginTop: 20, width: "60%", alignSelf: "center" }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLOR.primary_white_100,
  },

  slider_container: {
    marginBottom: 15,
  },

  label_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  label: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

  value: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
    fontWeight: 600,
  },

  comment_input: {
    height: 150, // Fixed height for 4 lines
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    marginHorizontal: 20,
  },
});

export default RoomReview;
