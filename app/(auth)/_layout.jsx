import { Stack } from "expo-router";
import { View, StatusBar } from "react-native";
import { HomeHeader } from "@/components/home";

const AuthStackLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
        <Stack.Screen name="login-password" options={{ headerShown: false }} />
        <Stack.Screen
          name="signup-create-name"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup-create-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="password-register" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default AuthStackLayout;
