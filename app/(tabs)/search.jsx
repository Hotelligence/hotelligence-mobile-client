import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SearchScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default SearchScreen;
