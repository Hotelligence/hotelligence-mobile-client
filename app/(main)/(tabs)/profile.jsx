import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { BarButton } from "@/components/profile";

const ProfileScreen = () => {
  const handleLogoutPress = async () => {
    console.log("Logout Pressed");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.user_name_text}>Trần Võ Sơn Tùng</Text>
        </View>
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <BarButton onPress={() => handleLogoutPress()} color={COLOR.secondary_red_100} iconName="LogOut" text="Đăng xuất" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  user_name_text: {
    fontSize: 22,
    fontWeight: 500,
  },
});

export default ProfileScreen;
