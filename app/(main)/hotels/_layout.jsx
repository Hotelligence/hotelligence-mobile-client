import { Stack, } from "expo-router";

const HotelStackLayout = () => {

  return (
    <Stack>
      <Stack.Screen
        name="[hotelID]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HotelStackLayout;
