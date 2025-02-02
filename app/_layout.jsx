import { Stack, Slot, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { COLOR } from "@/assets/colors/Colors";

const AppStackLayout = () => {
    // console.log('Hello app stack')
    const isLoggedIn = false; //handle this later
    const router = useRouter();

    //Check if user has logged in
    useEffect(() => {
      if(isLoggedIn) {
        router.replace("/(main)/(tabs)")
      } else{
        router.replace("/(auth)");
      }
    }, [isLoggedIn])

    return (
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(main)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    );
}

export default AppStackLayout;