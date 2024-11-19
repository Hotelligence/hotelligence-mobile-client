import { Tabs } from "expo-router";

const MainTabsLayout = () => {  
  console.log('Hello Main tabs')
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 74,
          paddingHorizontal: 8,
        },
      }}
    >
      <Tabs.Screen name="index" options={{
        title: "Trang chủ",
        headerShown: false,
      }} />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Tìm kiếm",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          headerShown: false,
          title: "Yêu thích",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "Lịch sử",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Tài khoản",
        }}
      />
    </Tabs>
  );
};

export default MainTabsLayout;
