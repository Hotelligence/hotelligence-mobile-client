import { useState, useEffect } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import {
  priceFilterOptions,
  ratingFilterOptions,
  starFilterOptions,
} from "@/assets/FilterSortOptions";
import { PriceSliderModal } from "@/components/modal";
import {
  formatVND,
  isoStringToDateString,
  dateObjectToTruncatedDate,
} from "@/utils/ValueConverter";
import { Circle, Star, SearchX } from "lucide-react-native";
import ScreenSpinner from "@/components/ScreenSpinner";
import { HttpStatusCode } from "axios";
import { getSearchResultAPI } from "@/api/HotelServices";
import MyAsyncStorage from "@/utils/MyAsyncStorage";
import { useAppContext } from "@/contexts/AppContext";

const SearchResult = () => {
  const router = useRouter();
  const { query, fromDate, toDate, numOfChild, numOfAdults } =
    useLocalSearchParams();
  // console.log(query, from, to, guests);

  const { userRecentViewHotels, setUserRecentViewHotels } = useAppContext();

  const guests = parseInt(numOfChild) + parseInt(numOfAdults);
  const from = fromDate ? new Date(fromDate) : null;
  const to = toDate ? new Date(toDate) : null;

  let period;
  if (!from && !to) {
    period = "";
  } else if (!from) {
    period = `Hôm nay - ${dateObjectToTruncatedDate(to)}`;
  } else if (!to) {
    period = `${dateObjectToTruncatedDate(from)}`;
  } else {
    period = `${dateObjectToTruncatedDate(from)} - ${dateObjectToTruncatedDate(
      to
    )}`;
  }

  const [selectedSortOption, setSelectedSortOption] = useState({
    value: "priceUp",
    sortBy: "discountPrice",
    sortOrder: "asc",
    label: "Giá thấp đến cao",
  });

  const [priceRange, setPriceRange] = useState(null);
  const [priceSliderVisible, setPriceSliderVisible] = useState(false);

  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSearchResult = async (
      query,
      from,
      to,
      guests,
      priceRange,
      minRatingScore,
      stars,
      sortOption
    ) => {
      setLoading(true);
      try {
        const tempPriceRange = priceRange ? priceRange : [0, 10000000];
        const tempMinRatingScore = minRatingScore ? minRatingScore.value : "";
        const tempStars = stars ? stars.value : "";
        const sortBy = sortOption ? sortOption.sortBy : "";
        const sortOrder = sortOption ? sortOption.sortOrder : "";
        const response = await getSearchResultAPI(
          query,
          from,
          to,
          guests,
          tempPriceRange,
          tempMinRatingScore,
          tempStars,
          sortBy,
          sortOrder
        );
        if (response.status === HttpStatusCode.Ok) {
          setSearchResult(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getSearchResult(
      query,
      isoStringToDateString(from),
      isoStringToDateString(to),
      guests,
      priceRange,
      selectedRating,
      selectedStar,
      selectedSortOption
    );
  }, [
    query,
    fromDate,
    toDate,
    guests,
    priceRange,
    selectedRating,
    selectedStar,
    selectedSortOption,
  ]);

  const onBackPress = () => {
    //clear something before navigate back
    router.back();
  };

  const handleOnHotelCardPress = async (
    hotelID, 
    hotelName,
    images,
    city,
    from,
    to,
    numOfChild,
    numOfAdults
  ) => {
    const viewedHotelInfo = {
      hotelID: hotelID,
      hotelName: hotelName,
      image: images ? images[0] : "temp_string", // Take first image if array,
      city: city,
    };

    const updatedHotels = [...userRecentViewHotels, viewedHotelInfo];

    setUserRecentViewHotels(updatedHotels);

    await MyAsyncStorage.setItem(
      "recentViewedHotels",
      JSON.stringify(updatedHotels)
    );

    router.push({
      pathname: "/hotels/[hotelID]",
      params: {
        hotelID: hotelID,
        fromDate: from,
        toDate: to,
        numOfChild: numOfChild,
        numOfAdults: numOfAdults,
      },
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
      imageURL={item?.images ? item?.images[0] : "temp_string"} //setting temp string here to make the image error to be true and display the image placeholder
      city={item?.city}
      ratingScore={
        item?.reviewAverageOverallPoint === "NaN"
          ? "0.0"
          : item?.reviewAverageOverallPoint.toFixed(1)
      }
      ratingCategory={item?.reviewAveragePointCategory}
      numOfReviews={item?.reviewCount}
      originPrice={item?.roomLowestOriginPrice || 0}
      discount={item?.roomLowestDiscountPercentage || 0}
      discountPrice={item?.roomLowestDiscountedPrice || 0}
      // taxPrice={item?.taxPrice}
      // extraFee={item?.extraFee}
      totalPrice={item?.roomLowestTotalPrice || 0}
      isFavorite={true}
      onPress={() =>
        handleOnHotelCardPress(
          item?.id,
          item?.hotelName,
          item?.images,
          item?.city,
          from,
          to,
          numOfChild,
          numOfAdults
        )
      }
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
      <Text style={styles.text_item}>
        {item.value === "" ? item.label : item.value}
      </Text>
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
      <PriceSliderModal
        visible={priceSliderVisible}
        values={priceRange}
        onOutsideModalPress={(values) => handleOutsideModalPress(values)}
      />
      <GeneralHeader title={query} onBackPress={() => onBackPress()} />
      {!from && !to && guests === "0" ? null : (
        <SearchInfoCard
          style={{ marginHorizontal: 20, marginTop: 15 }}
          searchKeyword={query}
          period={period}
          numOfGuest={guests}
          onEditPress={onBackPress}
        />
      )}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 15 }}
          contentContainerStyle={{
            paddingStart: 12,
            paddingEnd: 20,
            marginTop: 15,
          }}
        >
          <PriceRangePicker
            filterCategory={"Giá"}
            filterTruncatedContent={
              priceRange == null
                ? ""
                : `${formatVND(priceRange[0])}đ - ${formatVND(priceRange[1])}đ`
            }
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
      </View>
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <SortDropDown
          options={priceFilterOptions}
          placeholder="Sắp xếp theo"
          onChange={(value) => handleSortOptionChange(value)}
          style={styles.drop_down}
        />
      </View>
      {loading ? (
        <ScreenSpinner />
      ) : (
        <>
          {searchResult.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingBottom: 20,
                paddingHorizontal: 20,
              }}
              data={searchResult}
              ListHeaderComponent={
                <Text style={styles.num_of_result_text}>
                  <Text
                    style={{ color: COLOR.primary_gold_120, fontWeight: 600 }}
                  >
                    {searchResult.length}
                  </Text>{" "}
                  kết quả trả về cho tìm kiếm của bạn
                </Text>
              }
              renderItem={renderSearchResult}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <SearchX size={48} color={COLOR.primary_blue_100} />
              <Text
                style={{
                  fontSize: 18,
                  color: COLOR.primary_blue_100,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Rất tiếc, hiện tại không tìm thấy khách sạn nào thỏa các tùy
                chọn của Quý khách
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
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
