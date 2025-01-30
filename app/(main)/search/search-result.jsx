import { View, Text, StyleSheet, FlatList, ScrollView, StatusBar } from "react-native";
import GeneralHeader from "@/components/GeneralHeader";
import {
  SearchInfoCard,
  HotelDetailCard,
  FilterSelection,
} from "@/components/search";
import { hotels, recentSearch } from "@/assets/TempData"; //Delete later
import { useRouter } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import { useCallback } from "react";

const SearchResult = () => {
  const router = useRouter();
  const onBackPress = () => {
    //clear something before navigate back
    router.back();
  };

  const handleOnHotelCardPress = (hotelID) => {
    router.push({
      pathname: "/hotels/[hotelID]",
      params: { hotelID: hotelID },
    });
  };

  const renderSearchResult = useCallback(
    ({ item }) => (
      <HotelDetailCard
        style={{ marginTop: 15 }}
        hotelName={item?.hotelName}
        imageURL={item?.images[2]}
        city={item?.city}
        ratingScore={item?.ratingScore.toFixed(1)}
        ratingCategory={item?.ratingCategory}
        numOfReviews={item?.numOfReviews}
        originPrice={item?.originPrice}
        discount={item?.discount}
        discountPrice={item?.discountPrice}
        // taxPrice={item?.taxPrice}
        // extraFee={item?.extraFee}
        totalPrice={item?.totalPrice}
        isFavorite={item?.isFavorite}
        onPress={() => handleOnHotelCardPress(item?.id)}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <GeneralHeader title={"Vũng Tàu"} onBackPress={() => onBackPress()} />
      <SearchInfoCard
        style={{ marginHorizontal: 20, marginVertical: 15 }}
        searchKeyword={recentSearch[0]?.title}
        period={recentSearch[0].period}
        numOfGuestRoom={recentSearch[0].numOfGuestRoom}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, height: "5%", width: "100%" }}
        contentContainerStyle={{ paddingStart: 12, paddingEnd: 20 }}
      >
        <FilterSelection
          numOfFilters={1}
          filterCategory={"Phổ biến"}
          style={{ marginStart: 8 }}
        />
        <FilterSelection filterCategory={"Giá"} style={{ marginStart: 8 }} />
        <FilterSelection
          numOfFilters={2}
          filterCategory={"Đánh giá"}
          style={{ marginStart: 8 }}
        />
      </ScrollView>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}  
        data={hotels}
        ListHeaderComponent={
          <Text style={styles.num_of_result_text}>
            {hotels.length} kết quả trả về cho tìm kiếm của bạn
          </Text>
        }
        renderItem={renderSearchResult}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  num_of_result_text: {
    fontWeight: 500,
    fontSize: 14,
    color: COLOR.primary_blue_100,
    alignSelf: "center",
  },
});

export default SearchResult;
