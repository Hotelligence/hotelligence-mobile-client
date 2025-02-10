import { useState, useRef, forwardRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import {
  CircleButton,
  NoImage,
  StarDisplay,
  RatingScoreTag,
  AmenityDisplay,
  RoomDetailCard,
  DetailReviewPoint,
  CommentDisplay,
  SubmitButton,
  DatePicker,
  GuestNumberPicker,
} from "@/components/search";
import ScreenSpinner from "@/components/ScreenSpinner";
import { BookingAdditionalModal, DetailPriceModal } from "@/components/modal";
import { FavoriteButton } from "@/components/home";
import { rooms, amenities } from "@/assets/TempData"; //Delete later
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLOR } from "@/assets/colors/Colors";
import { ChevronLeft, MapPin, ChevronRight } from "lucide-react-native";
import {
  dateObjectToTruncatedDate,
  isoStringToDate,
  dateObjectToDateString,
} from "@/utils/ValueConverter";
import { HttpStatusCode } from "axios";
import { getHotelByID_API } from "@/api/HotelServices";
import { getRoomsInHotelAPI } from "@/api/RoomServices";
import { getReviewsByHotelID_API } from "@/api/ReviewServices";

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
        <RatingScoreTag ratingScore={ratingScore?.toFixed(1)} />
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

const RoomBookingSection = forwardRef(
  (
    {
      rooms,
      roomFilterSelected,
      onRoomFilterSelected,
      displayedRoom,
      totalRoom,
      fromDate,
      toDate,
      child,
      adults,
      handleDetailPress,
      handleSelectPress, //(2)
    },
    ref
  ) => {
    const [fromDatePickerVisible, setFromDatePickerVisible] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState(fromDate);
    const [toDatePickerVisible, setToDatePickerVisible] = useState(false);
    const [selectedToDate, setSelectedToDate] = useState(toDate);

    const [guestNumberPickerVisible, setGuestNumberPickerVisible] =
      useState(false);
    const [numOfAdult, setNumOfAdult] = useState(parseInt(adults));
    const [numOfChild, setNumOfChild] = useState(parseInt(child));

    const handleOutsideModalPress = (adults, children) => {
      setNumOfAdult(adults);
      setNumOfChild(children);
      setGuestNumberPickerVisible(false);
    };

    return (
      <View ref={ref} style={styles.room_booking_container}>
        <Text style={styles.section_title_text}>Chọn phòng</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 15,
          }}
        >
          <DatePicker
            label="Chọn ngày đi"
            placeholder={dateObjectToTruncatedDate(new Date())}
            value={selectedFromDate}
            display={Platform.OS === "ios" ? "inline" : "default"}
            datePickerVisible={fromDatePickerVisible}
            onChange={(e, selectedDate) => {
              setSelectedFromDate(selectedDate);
              setFromDatePickerVisible(!fromDatePickerVisible);
            }}
            onPress={() => {
              setFromDatePickerVisible(!fromDatePickerVisible);
            }}
            onOutsideModalPress={() =>
              setFromDatePickerVisible(!fromDatePickerVisible)
            }
            style={{ marginBottom: 10, flex: 1 }}
            minimumDate={new Date()}
          />
          <View
            style={{
              height: 2,
              width: "2%",
              backgroundColor: COLOR.primary_blue_50,
              alignSelf: "center",
              marginHorizontal: 10,
            }}
          />
          <DatePicker
            label="Chọn ngày về"
            placeholder={dateObjectToTruncatedDate(new Date())}
            value={selectedToDate}
            display={Platform.OS === "ios" ? "inline" : "default"}
            datePickerVisible={toDatePickerVisible}
            onChange={(e, selectedDate) => {
              setSelectedToDate(selectedDate);
              setToDatePickerVisible(!toDatePickerVisible);
            }}
            onPress={() => {
              setToDatePickerVisible(!toDatePickerVisible);
            }}
            onOutsideModalPress={() =>
              setToDatePickerVisible(!toDatePickerVisible)
            }
            style={{ marginBottom: 10, flex: 1 }}
            minimumDate={selectedFromDate}
          />
        </View>
        <GuestNumberPicker
          style={{ marginBottom: 10 }}
          placeholder="2 người lớn, 1 trẻ em"
          modalVisible={guestNumberPickerVisible}
          onPress={() => setGuestNumberPickerVisible(!guestNumberPickerVisible)}
          onOutsideModalPress={(adults, children) =>
            handleOutsideModalPress(adults, children)
          }
          numOfAdult={numOfAdult}
          numOfChild={numOfChild}
        />
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
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
              onSelectPress={() =>
                handleSelectPress(
                  //This function is different from the one in HotelDetail, use params number to distinguish them (1)
                  room?.id,
                  {
                    originPrice: room?.originPrice,
                    discountedPrice: room?.discountedPrice,
                    discountPercentage: room?.discountPercentage,
                    totalPrice: room?.totalPrice,
                  },
                  { fromDate: selectedFromDate, toDate: selectedToDate },
                  { numOfAdults: numOfAdult, numOfChild: numOfChild },
                )
              }
            />
          ))}
        </View>
      </View>
    );
  }
);

const FeePolicySection = ({ optionalFees, policies }) => {
  return (
    <View style={styles.fee_policy_section}>
      <Text style={styles.section_title_text}>Phí và chính sách</Text>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: COLOR.primary_blue_100,
          }}
        >
          Phí tùy chọn
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {optionalFees !== "" && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 10,
                backgroundColor: COLOR.primary_blue_100,
                marginHorizontal: 10,
              }}
            />
          )}
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 400,
              color: COLOR.primary_blue_100,
            }}
          >
            {optionalFees !== "" ? optionalFees : "Không."}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: COLOR.primary_blue_100,
          }}
        >
          Chính sách
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {policies !== "" && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 10,
                backgroundColor: COLOR.primary_blue_100,
                marginHorizontal: 10,
              }}
            />
          )}
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 400,
              color: COLOR.primary_blue_100,
            }}
          >
            {policies !== "" ? policies : "Không."}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ReviewSection = ({
  reviews,
  reviewCount,
  reviewCategory,
  reviewPoints = {
    overall: 0.0,
    cleanliness: 0.0,
    comfort: 0.0,
    staff: 0.0,
    facilities: 0.0,
    environmentFriendly: 0.0,
  },
  onViewAllReviewPress,
}) => {
  return (
    <View style={styles.review_section}>
      <Text style={styles.section_title_text}>Đánh giá</Text>
      <DetailReviewPoint
        overallPoint={reviewPoints?.overall}
        reviewCount={reviewCount}
        pointCategory={reviewCategory}
        cleanPoint={reviewPoints?.cleanliness}
        servicePoint={reviewPoints?.comfort}
        staffPoint={reviewPoints?.staff}
        facilityPoint={reviewPoints?.facilities}
        environmentPoint={reviewPoints?.environmentFriendly}
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

  const { hotelID, fromDate, toDate, numOfChild, numOfAdults } =
    useLocalSearchParams();

  const from = fromDate ? new Date(fromDate) : null; //from date passed from the prev screen
  const to = toDate ? new Date(toDate) : null; //to date passed from the prev screen

  //API fetched states
  const [hotelInfo, setHotelInfo] = useState(null);
  const [roomsInHotel, setRoomsInHotel] = useState([]);
  const [hotelReviews, setHotelReviews] = useState([]);

  //Other states
  const [wallpaperError, setWallpaperError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); //adjust this later
  const [loading, setLoading] = useState(false);
  const [roomFilterSelected, setRoomFilterSelected] = useState(0);
  const [selectedRoomPriceInfo, setSelectedRoomPriceInfo] = useState(null);
  const [selectedRoomID, setSelectedRoomID] = useState(null);
  const [stayPeriod, setStayPeriod] = useState(null);
  const [guests, setGuests] = useState(null);

  //Modal visibility states
  const [additionalModalVisible, setAdditionalModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);

  useEffect(() => {
    const getHotelByID = async (hotelID) => {
      try {
        const response = await getHotelByID_API(hotelID);
        if (response.status === HttpStatusCode.Ok) {
          setHotelInfo(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getRoomsInHotel = async (hotelID) => {
      try {
        const response = await getRoomsInHotelAPI(hotelID);
        if (response.status === HttpStatusCode.Ok) {
          setRoomsInHotel(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getReviewsOfHotel = async (hotelID) => {
      try {
        const response = await getReviewsByHotelID_API(hotelID);
        if (response.status === HttpStatusCode.Ok) {
          setHotelReviews(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = async (hotelID) => {
      setLoading(true);
      await getHotelByID(hotelID);
      await getRoomsInHotel(hotelID);
      await getReviewsOfHotel(hotelID);
      setLoading(false);
    };

    fetchData(hotelID);
  }, []);

  //Animation for the header bar:
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 250, 260], // More control points
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  //Animation to automatically scroll to room booking section:
  const scrollViewRef = useRef(null);
  const bookingSectionRef = useRef(null);

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

  const handleDetailPress = (roomID) => {
    router.push({
      pathname: "/rooms/[roomID]",
      params: { roomID: roomID },
    });
  };

  const handleSelectPress = (roomID, extraOptions, priceInfo, stayPeriod, guests) => {
    //(4)
    if (extraOptions) {
      setAdditionalModalVisible(true);
      setSelectedRoomPriceInfo(priceInfo);
      setSelectedRoomID(roomID);
      setStayPeriod(stayPeriod);
      setGuests(guests);
    } else {
      router.push({
        pathname: "/booking",
        params: {
          roomID: roomID,
          hotelName: hotelInfo?.hotelName,
          checkinDate: stayPeriod.fromDate,
          checkoutDate: stayPeriod.toDate,
          guestNumber: guests.numOfAdults + guests.numOfChild,
          extraOptionsName: extraOptions?.optionName,
        },
      });
    }
  };

  const handleViewAllReviewPress = () => {};

  const onAdditionalModalClose = () => {
    setAdditionalModalVisible(false);
  };

  const handleAdditionalBookingPress = async (selectedOption, roomID, stayPeriod, guests) => {
    setAdditionalModalVisible(false);
    router.push({
      pathname: "/booking",
      params: {
        roomID: roomID,
        hotelName: hotelInfo?.hotelName,
        checkinDate: stayPeriod.fromDate,
        checkoutDate: stayPeriod.toDate,
        guestNumber: guests.numOfAdults + guests.numOfChild,
        extraOptionsName: selectedOption?.optionName,
      },
    });
  };

  const onPriceModalClose = () => {
    setPriceModalVisible(false);
    setAdditionalModalVisible(true);
  };

  const handlePriceBookingPress = async () => {
    setPriceModalVisible(false);
    router.push({
      pathname: "/booking",
    });
  };

  const handleViewPricePress = () => {
    setAdditionalModalVisible(false);
    setPriceModalVisible(true);
  };

  const handleBookingPress = () => {
    bookingSectionRef.current?.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current?.scrollTo({
        y: pageY - 83, // Offset to account for header
        animated: true,
      });
    });
  };

  return (
    <View style={styles.container}>
      <BookingAdditionalModal
        visible={additionalModalVisible}
        additionalOptions={hotelInfo?.extraOptions}
        priceInfo={selectedRoomPriceInfo}
        onClose={() => onAdditionalModalClose()}
        onBookingPress={(selectedOption) =>
          handleAdditionalBookingPress(selectedOption, selectedRoomID, stayPeriod, guests)
        }
        onViewPriceDetailPress={handleViewPricePress}
      />
      <DetailPriceModal
        visible={priceModalVisible}
        onClose={() => onPriceModalClose()}
        onBookingPress={() => handlePriceBookingPress()}
      />
      {loading ? (
        <ScreenSpinner />
      ) : (
        <>
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
              {hotelInfo?.hotelName}
            </Text>
          </Animated.View>
          <CircleButton
            Icon={ChevronLeft}
            onPress={onBackPress}
            style={{ position: "absolute", top: 56, left: 20, zIndex: 2 }}
          />
          <Animated.ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 90 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
              }
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
                    uri: hotelInfo?.images[0],
                  }}
                  resizeMode="cover"
                  onError={() => setWallpaperError(true)}
                />
              )}
            </View>
            <IntroSection
              hotelName={hotelInfo?.hotelName}
              star={hotelInfo?.star}
              ratingScore={
                hotelInfo?.reviewAverageOverallPoint !== "NaN"
                  ? hotelInfo?.reviewAverageOverallPoint
                  : "0.0"
              }
              ratingCategory={hotelInfo?.reviewAveragePointCategory}
              numOfReviews={hotelInfo?.reviewCount}
              isFavorite={isFavorite}
              onFavoritePress={() => onFavoritePress()}
              address={hotelInfo?.address}
              description={hotelInfo?.description}
            />
            <AmenitiesSection
              amenities={amenities} //hard-coded data here
              // onViewAllPress={}
            />
            <RoomBookingSection
              ref={bookingSectionRef}
              rooms={roomsInHotel}
              displayedRoom={hotelInfo?.roomCount}
              totalRoom={hotelInfo?.roomCount}
              fromDate={from ? from : new Date()}
              toDate={to ? to : new Date()}
              child={numOfChild}
              adults={numOfAdults}
              roomFilterSelected={roomFilterSelected}
              onRoomFilterSelected={(selectedFilter) =>
                onFilterSelected(selectedFilter)
              }
              handleDetailPress={(roomID) => handleDetailPress(roomID)} //This is a 4 layer deep function, caution when maintaining
              handleSelectPress={(
                roomID,
                priceInfo,
                stayPeriod,
                guests,
                roomName, //(3)
              ) =>
                handleSelectPress(
                  roomID,
                  hotelInfo?.extraOptions,
                  priceInfo,
                  stayPeriod,
                  guests,
                  roomName,
                )
              } //This is a 4 layer deep function, caution when maintaining
            />
            <FeePolicySection
              policies={hotelInfo?.policies ? hotelInfo?.policies : ""}
              optionalFees={
                hotelInfo?.optionalFees ? hotelInfo?.optionalFees : ""
              }
            />
            <ReviewSection
              reviews={hotelReviews}
              reviewCount={hotelInfo?.reviewCount}
              reviewCategory={hotelInfo?.reviewAveragePointCategory}
              reviewPoints={{
                overall: hotelInfo?.reviewAverageOverallPoint?.toFixed(1),
                cleanliness: hotelInfo?.reviewAverageCleanPoint?.toFixed(1),
                comfort: hotelInfo?.reviewAverageServicePoint?.toFixed(1),
                staff: hotelInfo?.reviewAverageStaffPoint?.toFixed(1),
                facilities: hotelInfo?.reviewAverageFacilityPoint?.toFixed(1),
                environmentFriendly:
                  hotelInfo?.reviewAverageEnvironmentPoint?.toFixed(1),
              }}
              onViewAllReviewPress={() => handleViewAllReviewPress()}
            />
          </Animated.ScrollView>
          <View style={styles.submit_button_container}>
            <SubmitButton
              text="Đặt phòng"
              style={{ width: "95%" }}
              onPress={handleBookingPress}
            />
          </View>
        </>
      )}
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

  submit_button_container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  header_container: {
    position: "absolute",
    width: "100%",
    height: 93,
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
