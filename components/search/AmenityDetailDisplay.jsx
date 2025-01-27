import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AmenityDisplay } from ".";
import { COLOR } from "@/assets/colors/Colors";

const AmenityDetailDisplay = ({
  amenities,
  color = COLOR.primary_blue_100,
}) => {
  return (
    <View style={styles.container}>
      {amenities.map((amenity) => (
        <>
          <AmenityDisplay
            iconName={amenity.amenityIconName}
            label={amenity.amenityType}
            iconSize={20}
            fontSize={18}
            fontWeight={500}
            style={{ marginTop: 10 }}
          />
          {amenity.amenityName.map((name) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 40, marginVertical: 5, }}
            >
              <View style={[styles.bullet, { backgroundColor: color }]} />
              <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text, { color: color }]}>{name}</Text>
            </View>
          ))}
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  bullet: {
    width: 6,
    height: 6,
    borderRadius: 10,
  },

  text: {
    fontSize: 16,
  },
});

export default AmenityDetailDisplay;
