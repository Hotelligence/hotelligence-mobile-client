import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { HomeHeader } from "@/components/home";
import { HotelDetailCard } from "@/components/search";
import { hotels } from "@/assets/TempData"; //Delete later

const FavoriteScreen = () => {
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
        <Text style={styles.title_text}>Yêu thích</Text>
        <View style={{ gap: 20 }}>
          {hotels.map((item, index) => (
            <HotelDetailCard
              key={index}
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
});

export default FavoriteScreen;
