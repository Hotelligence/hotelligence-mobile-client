import { Stack } from "expo-router";

const AuthStackLayout = () => {
    console.log("Hello from auth stack");


  return (
    <Stack>
      <Stack.Screen name="index"></Stack.Screen>
    </Stack>
  );
};

export default AuthStackLayout;
