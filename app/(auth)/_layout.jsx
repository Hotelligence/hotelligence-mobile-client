import { Stack, Redirect } from "expo-router";
import { View, StatusBar } from "react-native";
import { HomeHeader } from "@/components/home";
import { useAuth } from "@clerk/clerk-expo";

const AuthStackLayout = () => {
  const { isSignedIn } = useAuth();

  if(isSignedIn) {
    return <Redirect href={"/"} />
  }

  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
      <Stack>
        <Stack.Screen name="authentication" options={{ headerShown: false }} />
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
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default AuthStackLayout;
