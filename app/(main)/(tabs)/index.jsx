import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import {
  RecentSearchedCard,
  HotelTruncatedCard,
  LocationTruncatedCard,
} from "@/components/home";
import {
  SearchBar,
  DatePicker,
  GuestNumberPicker,
  SubmitButton,
} from "@/components/search";
import ScreenSpinner from "@/components/ScreenSpinner";
import { COLOR } from "@/assets/colors/Colors";
import { recentSearch, hotels } from "@/assets/TempData";
import { useRouter } from "expo-router";
import { dateObjectToDateString, dateObjectToTruncatedDate } from "@/utils/ValueConverter";

const HomeScreen = () => {
  const router = useRouter();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [fromDatePickerVisible, setFromDatePickerVisible] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [toDatePickerVisible, setToDatePickerVisible] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(new Date(tomorrow));

  const [guestNumberPickerVisible, setGuestNumberPickerVisible] =
    useState(false);
  const [numOfAdult, setNumOfAdult] = useState(0);
  const [numOfChild, setNumOfChild] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onSearchPress = async (query, from, to, numOfChild, numOfAdults) => {
    setButtonLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200)); // delay UI for 200ms
    setButtonLoading(false);
    router.push({
      pathname: "/search/search-result",
      params: {
        query,
        fromDate: from || "",
        toDate: to || "",
        numOfChild: numOfChild,
        numOfAdults: numOfAdults,
      },
    });
  };

  const handleOutsideModalPress = (adults, children) => {
    setNumOfAdult(adults);
    setNumOfChild(children);
    setGuestNumberPickerVisible(false);
  };

  const renderRecentSearched = useCallback(
    ({ item }) => (
      <RecentSearchedCard
        style={{ marginStart: 10 }}
        searchKeyword={item?.title}
        period={item?.period}
        numOfGuestRoom={item?.numOfGuestRoom}
      />
    ),
    []
  );

  const renderHotels = useCallback(
    ({ item }) => (
      <HotelTruncatedCard
        style={{ marginStart: 10 }}
        hotelName={item?.hotelName}
        city={item?.city}
        ratingScore={item?.ratingScore}
        numOfReviews={item?.numOfReviews}
        imageURL={item?.images[0]}
        isFavorite={item?.isFavorite}
      />
    ),
    []
  );

  const renderLocations = useCallback(
    ({ item }) => (
      <LocationTruncatedCard
        style={{ marginStart: 10 }}
        city={item?.city}
        province={item?.province}
        imageURL={item?.images[1]}
      />
    ),
    []
  );

  if (loading) {
    return (
      <>
        <StatusBar
          barStyle={"light-content"}
          translucent={true}
          backgroundColor="transparent"
        />
        <ScreenSpinner />
      </>
    );
  }

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
            value={searchValue}
            placeholder="Tìm địa điểm, khách sạn, v.v."
            onChangeText={(value) => setSearchValue(value)}
            style={{ marginBottom: 10 }}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            <DatePicker
              label="Chọn ngày đi"
              placeholder={dateObjectToTruncatedDate(new Date())}
              value={selectedFromDate ? new Date(selectedFromDate) : new Date()}
              display={Platform.OS === "ios" ? "inline" : "default"}
              datePickerVisible={fromDatePickerVisible}
              onChange={(e, selectedDate) => {
                setSelectedFromDate(selectedDate);
                setFromDatePickerVisible(!fromDatePickerVisible);
              }}
              onPress={() => {
                setFromDatePickerVisible(!fromDatePickerVisible);
              }}
              onOutsideModalPress={() =>
                setFromDatePickerVisible(!fromDatePickerVisible)
              }
              style={{ marginBottom: 10, flex: 1 }}
              minimumDate={new Date()}
            />
            <View
              style={{
                height: 2,
                width: "2%",
                backgroundColor: COLOR.primary_blue_50,
                alignSelf: "center",
                marginHorizontal: 10,
              }}
            />
            <DatePicker
              label="Chọn ngày về"
              placeholder={dateObjectToTruncatedDate(new Date())}
              value={selectedToDate ? new Date(selectedToDate) : new Date(tomorrow)}
              display={Platform.OS === "ios" ? "inline" : "default"}
              datePickerVisible={toDatePickerVisible}
              onChange={(e, selectedDate) => {
                setSelectedToDate(selectedDate);
                setToDatePickerVisible(!toDatePickerVisible);
              }}
              onPress={() => {
                setToDatePickerVisible(!toDatePickerVisible);
              }}
              onOutsideModalPress={() =>
                setToDatePickerVisible(!toDatePickerVisible)
              }
              style={{ marginBottom: 10, flex: 1 }}
              minimumDate={
                selectedFromDate ? new Date(selectedFromDate) : new Date()
              }
            />
          </View>
          <GuestNumberPicker
            style={{ marginBottom: 10 }}
            placeholder="2 người lớn, 1 trẻ em"
            modalVisible={guestNumberPickerVisible}
            onPress={() =>
              setGuestNumberPickerVisible(!guestNumberPickerVisible)
            }
            onOutsideModalPress={(adults, children) =>
              handleOutsideModalPress(adults, children)
            }
            numOfAdult={numOfAdult}
            numOfChild={numOfChild}
          />
          <SubmitButton
            isLoading={buttonLoading}
            disabled={searchValue === ""}
            onPress={() =>
              onSearchPress(
                searchValue,
                selectedFromDate,
                selectedToDate,
                numOfChild,
                numOfAdult,
              )
            }
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
          <Text style={styles.general_section_title}>Các địa điểm nổi bật</Text>
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
