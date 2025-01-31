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
      <Stack.Screen
        name="booking-status"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="payment-e-wallet"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default BookingConfirmStackLayout;
