import { Stack, } from "expo-router";

const ReviewStackLayout = () => {

  return (
    <Stack>
      <Stack.Screen
        name="[roomID]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ReviewStackLayout;
