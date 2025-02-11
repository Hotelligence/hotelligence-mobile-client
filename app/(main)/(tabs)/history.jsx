import { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { bookingHistory } from "@/assets/TempData"; //Delete later
import { HotelHistoryCard } from "@/components/history";
import ScreenSpinner from "@/components/ScreenSpinner";
import { isoStringToDate } from "@/utils/ValueConverter";
import { useRouter } from "expo-router";
import { getUserBookingAPI, cancelBookingAPI } from "@/api/BookingServices";
import { useUser } from "@clerk/clerk-expo";
import { HttpStatusCode } from "axios";

const HistoryScreen = () => {
  const router = useRouter();
  const { user } = useUser();

  const [userBookingHistory, setUserBookingHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserBookingHistory = async (userID) => {
    setLoading(true);
    const response = await getUserBookingAPI(userID);
    if (response.status === HttpStatusCode.Ok) {
      setUserBookingHistory(response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserBookingHistory(user.id);
  }, []);

  const handleRatingPress = (hotelID, roomID) => {
    router.push({
      pathname: "/reviews/[roomID]",
      params: { roomID: roomID, hotelID: hotelID, },
    });
  };

  const handleCancelPress = async (bookingID) => {
    const response = await cancelBookingAPI(bookingID);
    if (response.status === HttpStatusCode.Ok) {
      await fetchUserBookingHistory(user.id);
    }    
  };

  const handlePaymentPress = (hotelID) => {
    console.log("Payment pressed: ", hotelID);
  };

  const handleOnHotelCardPress = (hotelID) => {
    console.log("Hotel ID: ", hotelID);
  };

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
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={styles.title_text}>Lịch sử đặt phòng</Text>
        <View style={{ gap: 20 }}>
          {userBookingHistory.map((item, index) => (
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
                  {item?.roomName} ({item?.numOfNights} đêm)
                </Text>
              </View>
              <HotelHistoryCard
                hotelID={item?.hotelId}
                bookingID={item?.id}
                bookingDate={isoStringToDate(item?.bookingDate)}
                checkinDate={isoStringToDate(item?.checkinDate)}
                checkoutDate={isoStringToDate(item?.checkoutDate)}
                bookingStatus={item?.bookingStatus}
                onRatingPress={() => handleRatingPress(item?.hotelId, item?.roomId)}
                onCancelPress={() => handleCancelPress(item?.id)}
                onPaymentPress={() => handlePaymentPress(item?.id)}
                onPress={() => handleOnHotelCardPress(item?.id)}
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
