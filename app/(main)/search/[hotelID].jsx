import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import {
  CircleButton,
  NoImage,
  StarDisplay,
  RatingScoreTag,
  AmenityDisplay,
  DatePicker,
  GuestNumberPicker,
  RoomDetailCard,
  DetailReviewPoint,
  CommentDisplay,
  SubmitButton,
} from "@/components/search";
import { FavoriteButton } from "@/components/home";
import { hotels, rooms, reviews, amenities } from "@/assets/TempData"; //Delete later
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import { ChevronLeft, MapPin, ChevronRight } from "lucide-react-native";
import { isoStringToDate } from "@/utils/ValueConverter";

const IntroSection = ({
  hotelName,
  star,
  ratingScore,
  ratingCategory,
  numOfReviews,
  isFavorite,
  onFavoritePress,
  address,
  description,
}) => {
  return (
    <View style={styles.intro_container}>
      <Text
        style={styles.hotelName_text}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {hotelName}
      </Text>
      <StarDisplay starCount={star} size={18} style={{ marginTop: 5 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <RatingScoreTag ratingScore={ratingScore} />
        <View style={{ marginStart: 4 }}>
          <Text style={styles.numOf_reviews_text}>
            ({numOfReviews} đánh giá)
          </Text>
          <Text style={styles.rating_category_text}>{ratingCategory}</Text>
        </View>
        <FavoriteButton
          isFavorite={isFavorite}
          style={{ marginStart: "auto" }}
          // onPress={() => onFavoritePress()}
          onPress={onFavoritePress}
        />
      </View>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <MapPin size={20} color={COLOR.primary_blue_100} strokeWidth={2.5} />
        <Text
          style={{
            marginStart: 5,
            color: COLOR.primary_blue_100,
            fontSize: 16,
          }}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {address}
        </Text>
      </View>
      <Text
        style={{
          color: COLOR.primary_blue_100,
          fontSize: 16,
          fontStyle: "italic",
        }}
      >
        {description}
      </Text>
    </View>
  );
};

const AmenitiesSection = ({ amenities, onViewAllPress }) => {
  const firstColumn = amenities.slice(0, Math.ceil(amenities.length / 2));
  const secondColumn = amenities.slice(Math.ceil(amenities.length / 2));

  return (
    <View style={styles.amenities_container}>
      <Text style={styles.section_title_text}>Tiện nghi, dịch vụ nổi bật</Text>
      <View style={styles.amenities_list_container}>
        <View style={{ flex: 1 }}>
          {firstColumn.map((amenity) => (
            <AmenityDisplay
              key={amenity.id}
              iconName={amenity.iconName}
              label={amenity.label}
              style={{ width: "85%", marginVertical: 1 }}
            />
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {secondColumn.map((amenity) => (
            <AmenityDisplay
              key={amenity.id}
              iconName={amenity.iconName}
              label={amenity.label}
              style={{ width: "85%", marginVertical: 1 }}
            />
          ))}
        </View>
      </View>
      <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.view_all_text}>Xem tất cả</Text>
        <ChevronRight
          size={16}
          color={COLOR.primary_gold_120}
          strokeWidth={2.25}
        />
      </Pressable>
    </View>
  );
};

const RoomBookingSection = ({
  rooms,
  roomFilterSelected,
  onRoomFilterSelected,
  displayedRoom,
  totalRoom,
  handleDetailPress,
  handleSelectPress,
}) => {
  return (
    <View style={styles.room_booking_container}>
      <Text style={styles.section_title_text}>Chọn phòng</Text>
      <DatePicker
        style={{ marginBottom: 10, marginTop: 15 }}
        placeholder="29 thg 3 - 30 thg 3"
      />
      <GuestNumberPicker
        style={{ marginBottom: 10 }}
        placeholder="2 khách, 1 phòng"
      />
      <View style={{ flexDirection: "row", alignContent: "center", gap: 10 }}>
        <Pressable
          onPress={() => onRoomFilterSelected(0)}
          style={[
            styles.filter_button,
            {
              backgroundColor:
                roomFilterSelected === 0
                  ? COLOR.tertiary_blue_40
                  : COLOR.primary_white_100,
            },
          ]}
        >
          <Text style={[styles.filter_text, { marginHorizontal: 5 }]}>
            Tất cả phòng
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onRoomFilterSelected(1)}
          style={[
            styles.filter_button,
            {
              backgroundColor:
                roomFilterSelected === 1
                  ? COLOR.tertiary_blue_40
                  : COLOR.primary_white_100,
            },
          ]}
        >
          <Text style={[styles.filter_text, { marginHorizontal: 5 }]}>
            1 giường
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onRoomFilterSelected(2)}
          style={[
            styles.filter_button,
            {
              backgroundColor:
                roomFilterSelected === 2
                  ? COLOR.tertiary_blue_40
                  : COLOR.primary_white_100,
            },
          ]}
        >
          <Text style={[styles.filter_text, { marginHorizontal: 5 }]}>
            2 giường
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          color: COLOR.primary_blue_100,
          fontSize: 16,
          marginVertical: 10,
        }}
      >
        Hiển thị {displayedRoom} trên {totalRoom} phòng
      </Text>
      <View style={{ gap: 15 }}>
        {rooms.map((room) => (
          <RoomDetailCard
            key={room?.id}
            roomName={room?.roomName}
            imageURL={room?.images[0]}
            originPrice={room?.originPrice}
            discountPercentage={room?.discountPercentage}
            discountedPrice={room?.discountedPrice}
            // taxPrice={room?.taxPrice}
            // extraFee={room?.extraFee}
            totalPrice={room?.totalPrice}
            onDetailPress={() => handleDetailPress(room?.id)}
            onSelectPress={() => handleSelectPress(room?.id)}
          />
        ))}
      </View>
    </View>
  );
};

const FeePolicySection = ({}) => {
  return (
    <View style={styles.fee_policy_section}>
      <Text style={styles.section_title_text}>Phí và chính sách</Text>
    </View>
  );
};

const ReviewSection = ({ reviews, reviewPoints, onViewAllReviewPress }) => {
  return (
    <View style={styles.review_section}>
      <Text style={styles.section_title_text}>Đánh giá</Text>
      <DetailReviewPoint
        overallPoint={8.8}
        reviewCount="59"
        pointCategory="Rất tốt"
        cleanPoint={8.8}
        servicePoint={9}
        staffPoint={8.6}
        facilityPoint={8.4}
        environmentPoint={8.6}
      />
      <View style={{ gap: 10, marginTop: 20 }}>
        {reviews.map((review) => (
          <CommentDisplay
            key={review?.id}
            overallPoint={review?.overallPoint}
            pointCategory={review?.pointCategory}
            comment={review?.comment}
            reviewDate={isoStringToDate(review?.reviewDate)}
            userName={review?.userName}
          />
        ))}
      </View>
      <Pressable
        onPress={onViewAllReviewPress}
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Text style={styles.view_all_text}>Xem tất cả Đánh giá</Text>
        <ChevronRight
          size={16}
          color={COLOR.primary_gold_120}
          strokeWidth={2.25}
        />
      </Pressable>
    </View>
  );
};

const HotelDetail = () => {
  const router = useRouter();

  const hotel = hotels[1]; //adjust this later
  const tempRooms = rooms.slice(0, 6);

  // const { hotelID } = useLocalSearchParams();

  const [wallpaperError, setWallpaperError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(hotel?.isFavorite); //adjust this later
  const [roomFilterSelected, setRoomFilterSelected] = useState(0);

  // useEffect(() => {
  //   //fetch data from server
  // }, [])

  const onFavoritePress = async () => {
    //send request to server to update favorite status
    setIsFavorite(!isFavorite);
  };

  const onBackPress = () => {
    //clear something before navigate back
    router.back();
  };

  const onFilterSelected = async (selectedFilter) => {
    setRoomFilterSelected(selectedFilter);
  };

  const handleDetailPress = (roomID) => {};

  const handleSelectPress = (roomID) => {};

  const handleViewAllReviewPress = () => {};

  return (
    <View style={styles.container}>
      <CircleButton
        Icon={ChevronLeft}
        onPress={onBackPress}
        style={{ position: "absolute", top: 46, left: 20, zIndex: 1 }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        <View style={styles.image}>
          {wallpaperError ? (
            <NoImage style={{ borderBottomWidth: 1 }} />
          ) : (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: hotel?.images[2],
              }}
              resizeMode="cover"
              onError={() => setWallpaperError(true)}
            />
          )}
        </View>
        <IntroSection
          hotelName={hotel?.hotelName}
          star={hotel?.star}
          ratingScore={hotel?.ratingScore.toFixed(1)}
          ratingCategory={hotel?.ratingCategory}
          numOfReviews={hotel?.numOfReviews}
          isFavorite={isFavorite}
          onFavoritePress={() => onFavoritePress()}
          address={hotel?.address}
          description={hotel?.description}
        />
        <AmenitiesSection
          amenities={amenities}
          // onViewAllPress={}
        />
        <RoomBookingSection
          displayedRoom={18}
          totalRoom={18}
          rooms={tempRooms}
          roomFilterSelected={roomFilterSelected}
          onRoomFilterSelected={(selectedFilter) =>
            onFilterSelected(selectedFilter)
          }
          handleDetailPress={(roomID) => handleDetailPress(roomID)} //This is a 4 layer deep function, caution when maintaining
          handleSelectPress={(roomID) => handleSelectPress(roomID)} //This is a 4 layer deep function, caution when maintaining
        />
        <FeePolicySection />
        <ReviewSection
          reviews={reviews}
          // reviewPoints={reviewPoints}
          onViewAllReviewPress={() => handleViewAllReviewPress()}
        />
      </ScrollView>
      <View style={styles.submit_button_container}>
        <SubmitButton text="Đặt phòng" style={{ width: "95%" }} />
      </View>
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
  },

  section_title_text: {
    fontWeight: 500,
    fontSize: 22,
    color: COLOR.primary_gold_120,
  },

  submit_button_container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
  },

  //Intro Section
  intro_container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  hotelName_text: {
    fontWeight: 500,
    fontSize: 28,
  },

  numOf_reviews_text: {
    fontSize: 11,
    color: COLOR.primary_blue_50,
  },

  rating_category_text: {
    fontWeight: 600,
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

  //Amenities Section
  amenities_container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  view_all_text: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.primary_gold_120,
    textDecorationLine: "underline",
  },

  amenities_list_container: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
  },

  //Room Booking Section
  room_booking_container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  filter_button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  filter_text: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

  //Fee Policy Section
  fee_policy_section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  //Review Section
  review_section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

export default HotelDetail;
