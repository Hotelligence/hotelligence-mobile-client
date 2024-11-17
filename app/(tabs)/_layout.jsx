import { Tabs } from "expo-router";

const MainTabsLayout = () => {
    console.log("Hello from app tabs");
  

  return (
    <Tabs>
      <Tabs.Screen name="index"></Tabs.Screen>
      <Tabs.Screen name="search"></Tabs.Screen>
      <Tabs.Screen name="favorite"></Tabs.Screen>
      <Tabs.Screen name="history"></Tabs.Screen>
      <Tabs.Screen name="profile"></Tabs.Screen>
    </Tabs>
  );
};

export default MainTabsLayout;
