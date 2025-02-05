import { View, Text, StyleSheet, ScrollView, FlatList, StatusBar } from "react-native";
import { RecentSearchedCard, HotelTruncatedCard, LocationTruncatedCard } from "@/components/home";
import { SearchBar, DatePicker, GuestNumberPicker, SubmitButton } from "@/components/search";
import { COLOR } from "@/assets/colors/Colors";
import { recentSearch, hotels } from "@/assets/TempData";
import { useRouter } from "expo-router";
import { useCallback } from "react";

const HomeScreen = () => {
  const router = useRouter();

  const onSearchPress = () => {
    //handle search logic
    router.push("/search/search-result")
  }

  const renderRecentSearched = useCallback(({ item }) => (
    <RecentSearchedCard
      style={{ marginStart: 10 }}
      searchKeyword={item?.title}
      period={item?.period}
      numOfGuestRoom={item?.numOfGuestRoom}
    />
  ), []);

  const renderHotels = useCallback(({ item }) => (
    <HotelTruncatedCard
      style={{ marginStart: 10 }}
      hotelName={item?.hotelName}
      city={item?.city}
      ratingScore={item?.ratingScore}
      numOfReviews={item?.numOfReviews}
      imageURL={item?.images[0]}
      isFavorite={item?.isFavorite}
    />
  ), []);

  const renderLocations = useCallback(({ item }) => (
     <LocationTruncatedCard
      style={{ marginStart: 10 }}
      city={item?.city}
      province={item?.province}
      imageURL={item?.images[1]}
    />
  ), []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.search_section}>
          <Text style={styles.search_section_title}>Bạn muốn đi đâu?</Text>
          <SearchBar
            style={{ marginBottom: 10 }}
            placeholder="Tìm địa điểm, khách sạn, v.v."
          />
          <DatePicker
            style={{ marginBottom: 10 }}
            placeholder="29 thg 3 - 30 thg 3"
          />
          <GuestNumberPicker
            style={{ marginBottom: 10 }}
            placeholder="2 khách, 1 phòng"
          />
          <SubmitButton
            onPress={() => onSearchPress()}
            style={{ marginTop: 5 }}
            text="Tìm"
          />
        </View>
        {/* Recent Search Section */}
        <View style={styles.general_searched_section}>
          <Text style={styles.general_section_title}>
            Tìm kiếm gần đây của bạn
          </Text>
          <FlatList
            contentContainerStyle={{ paddingStart: 10, paddingEnd: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentSearch} //replace this with real data from API
            renderItem={renderRecentSearched}
          />
        </View>
        {/* Recent Hotel View Section */}
        <View style={styles.general_searched_section}>
          <Text style={styles.general_section_title}>
            Khách sạn đã xem gần đây
          </Text>
          <FlatList
            contentContainerStyle={{ paddingStart: 10, paddingEnd: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={hotels} //replace this with real data from API
            renderItem={renderHotels}
          />
        </View>
        {/* Suggested Famous Location */}
        <View style={styles.general_searched_section}>
          <Text style={styles.general_section_title}>
            Tìm kiếm gần đây của bạn
          </Text>
          <FlatList
            contentContainerStyle={{ paddingStart: 10, paddingEnd: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={hotels} //replace this with real data from API
            renderItem={renderLocations}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
  },

  search_section: {
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },

  search_section_title: {
    fontWeight: 500,
    fontSize: 28,
    marginBottom: 15,
    color: COLOR.primary_blue_100,
  },

  general_searched_section: {
    marginTop: 30,
  },

  general_section_title: {
    fontWeight: 500,
    fontSize: 22,
    marginBottom: 10,
    marginStart: 20,
    color: COLOR.primary_blue_100,
  },
});

export default HomeScreen;
