import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from "react-native";
import {
  CircleButton,
  NoImage,
  AmenityDisplay,
  SubmitButton,
  AmenityDetailDisplay,
  DiscountTag,
} from "@/components/search";
import { DetailPriceModal } from "@/components/modal";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { rooms } from "@/assets/TempData"; //Delete later
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { formatVND } from "@/utils/ValueConverter";

const IntroSection = ({ roomName, amenities }) => {
  return (
    <View style={styles.intro_section_container}>
      <Text style={styles.room_name_text}>{roomName}</Text>
      <View style={{ marginVertical: 20 }}>
        {amenities.map((amenity) => (
          <AmenityDisplay
            iconName={amenity.amenityIconName}
            label={amenity.amenityType}
            style={{ marginVertical: 5 }}
          />
        ))}
      </View>
    </View>
  );
};

const AmenitiesSection = ({ amenities }) => {
  return (
    <View style={styles.amenities_section_container}>
      <Text style={styles.section_title_text}>Tiện nghi phòng</Text>
      <AmenityDetailDisplay amenities={amenities} />
    </View>
  );
};

const BottomSection = ({
  extraOptions,
  originPrice,
  discountPercentage,
  discountedPrice,
  totalPrice,
  onBookingPress,
  onViewPriceDetailPress,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={styles.bottom_section_container}>
      <Text style={{ color: COLOR.primary_blue_100, fontSize: 20, fontWeight: 600, }}>Tùy chọn thêm</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: COLOR.primary_blue_100,
          }}
        >
          Bổ sung
        </Text>
        <Text style={{ fontSize: 12, color: COLOR.primary_blue_100 }}>
          Giá mỗi đêm
        </Text>
      </View>
      {extraOptions.map((option, index) => (
        <View key={index} style={{ flexDirection: "row", marginVertical: 5 }}>
          <View style={{ flexDirection: "row", width: "55%" }}>
            <BouncyCheckbox
              size={20}
              fillColor={COLOR.primary_blue_100}
              useBuiltInState={false}
              isChecked={selectedOption === index}
              onPress={() => setSelectedOption(index)}
            />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.option_text}
            >
              {option?.optionName}
            </Text>
          </View>
          <Text style={styles.price_text}>
            + {formatVND(option?.optionPrice)}đ
          </Text>
        </View>
      ))}
      <View style={styles.divider} />
      <DiscountTag
        discount={discountPercentage}
        style={{ alignSelf: "flex-start", marginTop: 5 }}
      />
      <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
        <View style={{ width: "75%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.discount_price_text}>
              {formatVND(discountedPrice)}đ
            </Text>
            <Text style={styles.origin_price_text}>
              {formatVND(originPrice)}đ
            </Text>
          </View>
          <Text style={styles.total_price_text}>
            Tổng {formatVND(totalPrice)}đ bao gồm thuế và phí
          </Text>
          <Pressable
            onPress={onViewPriceDetailPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={styles.view_all_text}>Xem Chi tiết giá</Text>
            <ChevronRight
              size={16}
              color={COLOR.primary_gold_120}
              strokeWidth={2.25}
            />
          </Pressable>
        </View>
        <SubmitButton
          text="Đặt"
          style={{ justifySelf: "flex-end", width: "25%", marginTop: 30 }}
          onPress={() => onBookingPress(selectedOption)}
        />
      </View>
    </View>
  );
};

const RoomDetail = () => {
  const router = useRouter();

  // const { roomID } = useLocalSearchParams();
  const room = rooms[1];
  const amenities = [
    {
      amenityIconName: "ShowerHead",
      amenityType: "Phòng tắm",
      amenityName: ["Áo choàng tắm", "Chậu vệ sinh"],
    },
    {
      amenityIconName: "Wifi",
      amenityType: "Internet",
      amenityName: ["Wifi miễn phí"],
    },
    {
      amenityIconName: "BedSingle",
      amenityType: "Phòng ngủ",
      amenityName: ["Bộ trải giường"],
    },
    {
      amenityIconName: "Utensils",
      amenityType: "Ăn uống",
      amenityName: ["Minibar", "Ấm điện"],
    },
  ];

  const [wallpaperError, setWallpaperError] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);

  // useEffect(() => {
  //   //fetch data from server
  // }, [])

  const onBackPress = () => {
    //clear something before navigate back
    router.back();
  };

  const handleBookingPress = async (selectedOption) => {
    console.log("Selected index: ", selectedOption);
  }

    const onPriceModalClose = () => {
      setPriceModalVisible(false);
    };

    const handlePriceBookingPress = async () => {
      setPriceModalVisible(false);
    };

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 250, 260], // More control points
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <DetailPriceModal
        visible={priceModalVisible}
        onClose={() => onPriceModalClose()}
        onBookingPress={() => handlePriceBookingPress()}
      />
      <Animated.View
        style={[styles.header_container, { opacity: headerOpacity }]}
      >
        <CircleButton
          Icon={ChevronLeft}
          onPress={onBackPress}
          style={styles.header_back_button}
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.header_title_text}
        >
          {room?.roomName}
        </Text>
      </Animated.View>
      <CircleButton
        Icon={ChevronLeft}
        onPress={onBackPress}
        style={{ position: "absolute", top: 46, left: 20, zIndex: 2 }}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.image}>
          {wallpaperError ? (
            <NoImage style={{ borderBottomWidth: 1 }} />
          ) : (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: room?.images[0],
              }}
              resizeMode="cover"
              onError={() => setWallpaperError(true)}
            />
          )}
        </View>
        <IntroSection roomName={room?.roomName} amenities={amenities} />
        <AmenitiesSection amenities={amenities} />
        <View style={[styles.divider, { marginHorizontal: 20 }]} />
        <BottomSection
          extraOptions={room?.extraOptions}
          originPrice={room?.originPrice}
          discountPercentage={room?.discountPercentage}
          discountedPrice={room?.discountedPrice}
          totalPrice={room?.totalPrice}
          onBookingPress={(selectedOption) =>
            handleBookingPress(selectedOption)
          }
          onViewPriceDetailPress={() => setPriceModalVisible(true)}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  image: {
    width: "100%",
    height: 260,
    resizeMode: "cover",
  },

  section_title_text: {
    fontWeight: 500,
    fontSize: 22,
    color: COLOR.primary_gold_120,
  },

  divider: {
    height: 1,
    backgroundColor: COLOR.primary_blue_50,
    marginVertical: 25,
  },

  header_container: {
    position: "absolute",
    width: "100%",
    height: 83,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
    backgroundColor: COLOR.primary_white_100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 10,
    zIndex: 1,
  },

  header_back_button: {
    position: "absolute",
    left: 20,
    bottom: 6,
  },

  header_title_text: {
    fontWeight: 500,
    fontSize: 20,
    width: "65%",
    textAlign: "center",
  },

  // Intro Section
  intro_section_container: {
    paddingHorizontal: 20,
  },

  room_name_text: {
    fontWeight: 500,
    fontSize: 24,
    color: COLOR.primary_blue_100,
    marginTop: 20,
  },

  //Amenities Section
  amenities_section_container: {
    paddingHorizontal: 20,
  },

  //Bottom Section
  bottom_section_container: {
    paddingHorizontal: 20,
  },

  view_all_text: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.primary_gold_120,
    textDecorationLine: "underline",
  },

  origin_price_text: {
    fontSize: 18,
    color: COLOR.primary_blue_50,
    textDecorationLine: "line-through",
    marginStart: 5,
  },

  discount_price_text: {
    fontWeight: 500,
    fontSize: 22,
    marginVertical: 2,
    color: COLOR.primary_blue_100,
  },

  total_price_text: {
    fontSize: 12,
    color: COLOR.primary_blue_50,
  },

  price_text: {
    fontWeight: 500,
    fontSize: 16,
    color: COLOR.primary_blue_100,
    marginStart: "auto",
  },

  option_text: {
    fontWeight: 400,
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },
});

export default RoomDetail;
