import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import GeneralHeader from "@/components/GeneralHeader";
import {
  SearchInfoCard,
  HotelDetailCard,
  FilterSelection,
  SortDropDown,
  PriceRangePicker,
} from "@/components/search";
import { hotels, recentSearch } from "@/assets/TempData"; //Delete later
import { useRouter } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import {
  priceFilterOptions,
  ratingFilterOptions,
  starFilterOptions,
} from "@/assets/FilterSortOptions";
import { PriceSliderModal } from "@/components/modal";
import { formatVND } from "@/utils/ValueConverter";
import { Circle, Star } from "lucide-react-native";

const SearchResult = () => {
  const router = useRouter();

  const [selectedSortOption, setSelectedSortOption] = useState("");

  const [priceRange, setPriceRange] = useState([100000, 5000000]);
  const [priceSliderVisible, setPriceSliderVisible] = useState(false);

  const [selectedRating, setSelectedRating] = useState();
  const [selectedStar, setSelectedStar] = useState();

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

  const handleSortOptionChange = (value) => {
    setSelectedSortOption(value);
  };

  const handleOutsideModalPress = (values) => {
    setPriceSliderVisible(false);
    setPriceRange(values);
  };

  const handleSelectedRating = (value) => {
    setSelectedRating(value);
  };

  const handleSelectedStar = (value) => {
    setSelectedStar(value);
  };

  const renderSearchResult = ({ item }) => (
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
  );

  const renderRatingItem = (item, selected) => (
    <View style={styles.item}>
      <Circle
        size={16}
        color={COLOR.primary_blue_100}
        fill={selected ? COLOR.primary_blue_100 : "transparent"}
        style={{ marginRight: 8 }}
      />
      <Text style={styles.text_item}>{item.label}</Text>
    </View>
  );

  const renderStarItem = (item, selected) => (
    <View style={styles.item}>
      <Circle
        size={16}
        color={COLOR.primary_blue_100}
        fill={selected ? COLOR.primary_blue_100 : "transparent"}
        style={{ marginRight: 8 }}
      />
      <Text style={styles.text_item}>{item.value === "" ? item.label : item.value}</Text>
      {item.value !== "" && (
        <Star
          size={14}
          color={COLOR.primary_blue_100}
          fill={COLOR.primary_blue_100}
          style={{ marginStart: 3 }}
        />
      )}
    </View>
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
        style={{ marginBottom: 15, height: "6%", width: "100%" }}
        contentContainerStyle={{ paddingStart: 12, paddingEnd: 20 }}
      >
        <PriceRangePicker
          filterCategory={"Giá"}
          filterTruncatedContent={`${formatVND(priceRange[0])}đ - ${formatVND(
            priceRange[1]
          )}đ`}
          style={{ marginStart: 8 }}
          onPress={() => setPriceSliderVisible(true)}
        />
        <FilterSelection
          label="Đánh giá"
          data={ratingFilterOptions}
          value={selectedRating}
          onSelect={(value) => handleSelectedRating(value)}
          style={{ marginStart: 8 }}
          renderItem={renderRatingItem}
          minWidth={140}
        />
        <FilterSelection
          label="Xếp hạng Sao"
          data={starFilterOptions}
          value={selectedStar}
          onSelect={(value) => handleSelectedStar(value)}
          style={{ marginStart: 8 }}
          renderItem={renderStarItem}
          minWidth={90}
        />
      </ScrollView>
      <View style={{ width: "100%", paddingHorizontal: 15 }}>
        <SortDropDown
          options={priceFilterOptions}
          placeholder="Sắp xếp theo"
          onChange={(value) => handleSortOptionChange(value)}
          style={styles.drop_down}
        />
      </View>
      <PriceSliderModal
        visible={priceSliderVisible}
        values={priceRange}
        onOutsideModalPress={(values) => handleOutsideModalPress(values)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        data={hotels}
        ListHeaderComponent={
          <Text style={styles.num_of_result_text}>
            <Text style={{ color: COLOR.primary_gold_120, fontWeight: 600 }}>
              {hotels.length}
            </Text>{" "}
            kết quả trả về cho tìm kiếm của bạn
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

  drop_down: {
    marginBottom: 15,
    alignSelf: "flex-end",
  },

  item: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  text_item: {
    fontSize: 14,
    color: COLOR.primary_blue_100,
  },
});

export default SearchResult;
