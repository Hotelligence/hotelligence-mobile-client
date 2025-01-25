import { Tabs } from "expo-router";
import {
  HomeFill,
  HomeStroke,
  SearchFill,
  SearchStroke,
  HeartFill,
  HeartStroke,
  History,
  UserFill,
  UserStroke,
} from "@/assets/icons";
import { COLOR } from "@/assets/colors/Colors";

const MainTabsLayout = () => {
  // console.log("Hello Main tabs");
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 74,
          paddingHorizontal: 8,
        },
        tabBarActiveTintColor: COLOR.primary_blue_100,
        tabBarInactiveTintColor: COLOR.primary_blue_50,
        tabBarLabelStyle: {
          fontWeight: 500,
          fontSize: 11,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeFill fill={COLOR.primary_blue_100} />
            ) : (
              <HomeStroke fill={COLOR.primary_blue_50} />
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
              <SearchFill fill={COLOR.primary_blue_100} />
            ) : (
              <SearchStroke fill={COLOR.primary_blue_50} />
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
              <HeartFill fill={COLOR.primary_blue_100} />
            ) : (
              <HeartStroke fill={COLOR.primary_blue_50} />
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
              <History fill={COLOR.primary_blue_100} />
            ) : (
              <History fill={COLOR.primary_blue_50} />
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
              <UserFill fill={COLOR.primary_blue_100} />
            ) : (
              <UserStroke fill={COLOR.primary_blue_50} />
            ),
        }}
      />
    </Tabs>
  );
};

export default MainTabsLayout;
