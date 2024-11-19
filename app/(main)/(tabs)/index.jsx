import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { HomeHeader } from "@/components/home";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeScreen;
