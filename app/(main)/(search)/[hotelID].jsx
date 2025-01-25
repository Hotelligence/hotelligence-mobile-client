import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { CircleButton, NoImage } from "@/components/search";
import { hotels } from "@/assets/TempData"; //Delete later
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import { ChevronLeft } from "@/assets/icons";

const HotelDetail = () => {
  const router = useRouter();

  const onBackPress = () => {
    //clear something before navigate back
    router.back();
  };

  // const { hotelID } = useLocalSearchParams();

  const [wallpaperError, setWallpaperError] = useState(false);

  // useEffect(() => {
  //   //fetch data from server
  // }, [])

  console.log(wallpaperError);

  return (
    <View style={styles.container}>
      <CircleButton
        Icon={ChevronLeft}
        onPress={onBackPress}
        style={{ position: "absolute", top: 41, left: 20, zIndex: 1 }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: "100%" }}
      >
        <View style={styles.image}>
          {wallpaperError ? (
            <NoImage style={{ borderBottomWidth: 1 }} />
          ) : (
            <Image
              source={{
                uri: hotels[0]?.images[2],
              }}
              onError={() => setWallpaperError(true)}
            />
          )}
        </View>
        <Text>asjkdnasjkdb</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  num_of_result_text: {
    fontWeight: 500,
    fontSize: 14,
    color: COLOR.primary_blue_100,
    alignSelf: "center",
  },

  image: {
    width: "100%",
    height: "26%",
  },
});

export default HotelDetail;
