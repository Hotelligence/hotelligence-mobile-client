import { View, Text, StyleSheet, StatusBar } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { HomeHeader } from "@/components/home";
import { SearchBar, DatePicker, GuestNumberPicker, SubmitButton } from "@/components/search";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
      <HomeHeader />
      <View style={styles.search_section}>
        <Text style={styles.search_section_title}>Tìm kiếm khách sạn</Text>
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
});

export default SearchScreen;
