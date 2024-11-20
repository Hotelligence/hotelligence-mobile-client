import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const LocationTruncatedCard = ({ style, isClickable }) => {
  return (
    <Pressable style={[styles.container, style]}>
      <Text>LocationTruncatedCard</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LocationTruncatedCard;
