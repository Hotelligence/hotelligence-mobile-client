import { Stack, } from "expo-router";

const SearchStackLayout = () => {
  // console.log("Hello search stack");

  return (
    <Stack>
      <Stack.Screen
        name="search-result"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[hotelID]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SearchStackLayout;
