import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { HomeHeader } from "@/components/home";
import { hotels, hotelHistory, bookingHistory } from "@/assets/TempData"; //Delete later
import { HotelHistoryCard } from "@/components/history";
import { isoStringToDate } from "@/utils/ValueConverter";

const HistoryScreen = () => {

  const handleRatingPress = (hotelID) => {
    console.log("Rating pressed: ", hotelID);
  };

  const handleCancelPress = (hotelID) => {
    console.log("Cancel pressed: ", hotelID);
  };

  const handlePaymentPress = (hotelID) => {
    console.log("Payment pressed: ", hotelID);
  };

  const handleOnHotelCardPress = (hotelID) => {
    console.log("Hotel ID: ", hotelID);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={styles.title_text}>Lịch sử đặt phòng</Text>
        <View style={{ gap: 20 }}>
          {bookingHistory.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  marginBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={styles.bullet_point}></View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.room_name_text}
                >
                  {item?.roomName} ({item?.numOfGuests} khách |{" "}
                  {item?.numOfNights} đêm)
                </Text>
              </View>
              <HotelHistoryCard
                hotelName={item?.hotelName}
                imageURL={item?.image}
                city={item?.city}
                bookingID={item?.bookingID}
                bookingTime={isoStringToDate(item?.bookingTime)}
                checkinTime={isoStringToDate(item?.checkinTime)}
                checkoutTime={isoStringToDate(item?.checkoutTime)}
                status={item?.status}
                onRatingPress={() => handleRatingPress(item?.bookingID)} // Change this to id later
                onCancelPress={() => handleCancelPress(item?.bookingID)} // Change this to id later
                onPaymentPress={() => handlePaymentPress(item?.bookingID)} // Change this to id later
                onPress={() => handleOnHotelCardPress(item?.bookingID)} // Change this to id later
              />
            </View>
          ))}
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

  title_text: {
    fontWeight: 500,
    fontSize: 28,
    marginBottom: 25,
    color: COLOR.primary_blue_100,
    textAlign: "center",
  },

  bullet_point: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLOR.primary_gold_120,
    marginHorizontal: 10,
  },

  room_name_text: {
    fontSize: 18,
    fontWeight: 500,
    color: COLOR.primary_gold_120,
    flex: 1,
  },
});

export default HistoryScreen;
