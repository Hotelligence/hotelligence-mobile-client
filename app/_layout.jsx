import { Stack, Slot, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";

const AppStackLayout = () => {
    console.log("Hello from app stack")

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
        <Stack.Screen name="(auth)"></Stack.Screen>
        <Stack.Screen name="(tabs)"></Stack.Screen>
      </Stack>
    );
}

export default AppStackLayout;