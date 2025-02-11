import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MyAsyncStorage from "@/utils/MyAsyncStorage";

const MainStackLayout = () => {
  const {
    fetchUserFavoriteList,
    setUserSearchHistory,
    setUserRecentViewHotels,
  } = useAppContext();

  useEffect(() => {
    const fetchUserSearchHistory = async () => {
      const searchHistory = await MyAsyncStorage.getItem("searchHistory");
      if (searchHistory) {
        const parsed = JSON.parse(searchHistory);
        // Filter out undefined/null entries
        const validValues = parsed.filter(
          (item) =>
            item &&
            item.query &&
            item.from &&
            item.to &&
            item.numOfChild !== undefined &&
            item.numOfAdults !== undefined
        );
        setUserSearchHistory(validValues);
      } else {
        setUserSearchHistory([]);
      }
    };

    const fetchUserRecentViewHotels = async () => {
      const recentViewHotels = await MyAsyncStorage.getItem(
        "recentViewedHotels"
      );
      if (recentViewHotels) {
        const parsed = JSON.parse(recentViewHotels);
        // Filter out undefined/null entries
        const validValues = parsed.filter(
          (item) =>
            item && item.hotelID && item.hotelName && item.city && item.image
        );
        setUserRecentViewHotels(validValues);
      } else {
        setUserRecentViewHotels([]);
      }
    };

    fetchUserFavoriteList();
    fetchUserSearchHistory();
    fetchUserRecentViewHotels();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="hotels"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="rooms"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="booking"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reviews"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default MainStackLayout;
