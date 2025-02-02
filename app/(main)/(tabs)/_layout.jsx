import { Tabs } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import { Platform, View } from "react-native";
import { HomeHeader } from "@/components/home";

import { House, Search, Heart, History, User } from "lucide-react-native";

const MainTabsLayout = () => {
  // console.log("Hello Main tabs");
  return (
    <View style={{ flex: 1, }}>
      <HomeHeader />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: Platform.OS === "ios" ? 70 : 60,
            paddingHorizontal: 8,
            // iOS shadow
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 5,
            backgroundColor: COLOR.primary_white_100,
          },
          tabBarActiveTintColor: COLOR.primary_blue_100,
          tabBarInactiveTintColor: COLOR.primary_blue_50,
          tabBarLabelStyle: {
            fontWeight: 500,
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Trang chủ",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <House color={COLOR.primary_blue_100} strokeWidth={2.6} />
              ) : (
                <House color={COLOR.primary_blue_50} />
              ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: "Tìm kiếm",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Search color={COLOR.primary_blue_100} strokeWidth={2.6} />
              ) : (
                <Search color={COLOR.primary_blue_50} />
              ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            headerShown: false,
            title: "Yêu thích",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Heart color={COLOR.primary_blue_100} strokeWidth={2.6} />
              ) : (
                <Heart color={COLOR.primary_blue_50} />
              ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            headerShown: false,
            title: "Lịch sử",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <History color={COLOR.primary_blue_100} strokeWidth={2.6} />
              ) : (
                <History color={COLOR.primary_blue_50} />
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Tài khoản",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <User color={COLOR.primary_blue_100} strokeWidth={2.6} />
              ) : (
                <User color={COLOR.primary_blue_50} />
              ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default MainTabsLayout;
