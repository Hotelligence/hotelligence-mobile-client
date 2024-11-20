import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { HomeHeader, RecentSearchedCard, HotelTruncatedCard, LocationTruncatedCard } from "@/components/home";
import { SearchBar, DatePicker, GuestNumberPicker, SubmitButton } from "@/components/search";
import { COLOR } from "@/assets/colors/Colors";
import { recentSearch, hotels } from "@/assets/TempData";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
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
          <SubmitButton style={{ marginTop: 5 }} text="Tìm" />
        </View>
        {/* Recent Search Section */}
        <View style={styles.general_searched_section}>
          <Text style={styles.general_section_title}>
            Tìm kiếm gần đây của bạn
          </Text>
          <FlatList
            contentContainerStyle={{ paddingStart: 10, paddingEnd: 20, }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentSearch} //replace this with real data from API
            renderItem={({ item }) => (
              <RecentSearchedCard
                style={{ marginStart: 10 }}
                title={item?.title}
                period={item?.period}
                numOfGuestRoom={item?.numOfGuestRoom}
              />
            )}
          />
        </View>
        {/* Recent Hotel View Section */}
        <View style={styles.general_searched_section}>
          <Text style={styles.general_section_title}>
            Khách sạn đã xem gần đây
          </Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 10, paddingEnd: 20, }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={hotels} //replace this with real data from API
            renderItem={({ item }) => (
              <HotelTruncatedCard
                style={{ marginStart: 10 }}
                hotelName={item?.hotelName}
                city={item?.city}
                ratingScore={item?.ratingScore}
                numOfReviews={item?.numOfReviews}
                imageURL={item?.images[0]}
              />
            )}
          />
        </View>
        {/* Suggested Famous Location */}
        <View style={styles.general_searched_section}>
          <Text style={styles.general_section_title}>
            Tìm kiếm gần đây của bạn
          </Text>
          <FlatList
            contentContainerStyle={{ marginStart: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentSearch} //replace this with real data from API
            renderItem={({ item }) => (
              <RecentSearchedCard
                style={{ marginStart: 10 }}
                title={item?.title}
                period={item?.period}
                numOfGuestRoom={item?.numOfGuestRoom}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },

  search_section: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },

  search_section_title: {
    fontWeight: 500,
    fontSize: 28,
    marginBottom: 15,
  },

  general_searched_section: {
    marginTop: 30,
  },

  general_section_title: {
    fontWeight: 500,
    fontSize: 22,
    marginBottom: 10,
    marginStart: 20,
  },

});

export default HomeScreen;
