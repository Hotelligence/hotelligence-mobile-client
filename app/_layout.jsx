import { Stack, Slot, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";

const AppStackLayout = () => {
    const isLoggedIn = true; //handle this later
    const router = useRouter();

    //Check if user has logged in
    useEffect(() => {
      if(isLoggedIn) {
        router.replace("/(tabs)")
      } else{
        router.replace("/(auth)");
      }
    }, [isLoggedIn])

    return (
      <Stack>
        <Stack.Screen name="(auth)" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
        }} />
      </Stack>
    );
}

export default AppStackLayout;