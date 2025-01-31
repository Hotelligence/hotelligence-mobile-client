import { Stack, } from "expo-router";

const RoomStackLayout = () => {

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

export default RoomStackLayout;
