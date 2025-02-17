import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { useState } from "react";
import { COLOR } from "@/assets/colors/Colors";
import { BarButton } from "@/components/profile";
import { ConfirmActionModal } from "@/components/modal";
import { useClerk, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

const ProfileScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutPress = async () => {
    setModalVisible(true);
  };

  const handleConfirmLogoutPress = async () => {
    try {
      await signOut();
      setModalVisible(false);
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <View style={styles.container}>
      <ConfirmActionModal
        visible={modalVisible}
        title="Đăng xuất?"
        confirmationText="Bạn có chắc chắn muốn đăng xuất không?"
        onConfirmPress={handleConfirmLogoutPress}
        onClose={() => setModalVisible(false)}
      />
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
          <Text
            style={styles.user_name_text}
          >{`${user.lastName ? user.lastName : ""} ${user.firstName ? user.firstName : ""}`}</Text>
        </View>
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 20, gap: 20 }}>
        <BarButton iconName="MessageCircle" text="FAQ" />
        <BarButton iconName="Info" text="Về chúng tôi" />
        <BarButton
          onPress={() => handleLogoutPress()}
          color={COLOR.secondary_red_100}
          iconName="LogOut"
          text="Đăng xuất"
        />
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
    marginTop: 10,
  },
});

export default ProfileScreen;
