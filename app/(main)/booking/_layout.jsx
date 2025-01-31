import { Stack, } from "expo-router";

const BookingConfirmStackLayout = () => {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="booking-confirmation"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default BookingConfirmStackLayout;
