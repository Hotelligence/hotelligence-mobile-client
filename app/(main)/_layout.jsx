import { Stack, Slot, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";

const MainStackLayout = () => {
  // console.log("Hello Main stack");

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
    </Stack>
  );
};

export default MainStackLayout;
