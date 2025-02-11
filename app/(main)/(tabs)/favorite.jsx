import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { HotelDetailCard } from "@/components/search";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useAppContext } from "@/contexts/AppContext";

const FavoriteScreen = () => {
  const router = useRouter();
  const { userFavoriteList, fetchUserFavoriteList } = useAppContext();

  const [refreshing, setRefreshing] = useState(false);

  const handleOnHotelCardPress = (hotelID) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    router.push({
      pathname: "/hotels/[hotelID]",
      params: {
        hotelID: hotelID,
        fromDate: new Date(),
        toDate: tomorrow,
        numOfAdults: 1,
        numOfChild: 0,
      },
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserFavoriteList();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLOR.primary_gold_100}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={styles.title_text}>Yêu thích</Text>
        <View style={{ gap: 20 }}>
          {userFavoriteList.length > 0 &&
            userFavoriteList.map((item, index) => (
              <HotelDetailCard
                key={index}
                hotelName={item?.hotelName}
                imageURL={item?.images[0]}
                city={item?.city}
                ratingScore={item?.reviewAverageOverallPoint.toFixed(1)}
                ratingCategory={item?.reviewAveragePointCategory}
                numOfReviews={item?.reviewCount}
                originPrice={item?.roomLowestOriginPrice}
                discount={item?.roomLowestDiscountPercentage}
                discountPrice={item?.roomLowestDiscountedPrice}
                // taxPrice={item?.taxPrice}
                // extraFee={item?.extraFee}
                totalPrice={item?.roomLowestTotalPrice}
                isFavorite={true}
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
