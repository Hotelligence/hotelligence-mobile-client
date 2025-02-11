import { Stack, } from "expo-router";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";

const MainStackLayout = () => {
  const { fetchUserFavoriteList } = useAppContext();

  useEffect(() => {
    fetchUserFavoriteList();
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
