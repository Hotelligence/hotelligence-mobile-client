import { Slot } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/ExpoSecureStore";
import { AppProvider } from "@/contexts/AppContext";

const AppStackLayout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <AppProvider>
        <ClerkLoaded>
          <Slot />
        </ClerkLoaded>
      </AppProvider>
    </ClerkProvider>
  );

  // <Stack>
  //   <Stack.Screen
  //     name="(auth)"
  //     options={{
  //       headerShown: false,
  //     }}
  //   />
  //   <Stack.Screen
  //     name="(main)"
  //     options={{
  //       headerShown: false,
  //     }}
  //   />
  // </Stack>;
};

export default AppStackLayout;
