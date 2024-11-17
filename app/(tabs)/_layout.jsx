import { Tabs } from "expo-router";

const MainTabsLayout = () => {  
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
      }}/>
      <Tabs.Screen name="search" options={{
        headerShown: false,
      }}/>
      <Tabs.Screen name="favorite" options={{
        headerShown: false,
      }}/>
      <Tabs.Screen name="history" options={{
        headerShown: false,
      }}/>
      <Tabs.Screen name="profile" options={{
        headerShown: false,
      }}/>
    </Tabs>
  );
};

export default MainTabsLayout;
