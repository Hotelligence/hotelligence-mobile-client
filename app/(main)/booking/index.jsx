import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import GeneralHeader from "@/components/GeneralHeader";
import { InputField, SubmitButton } from "@/components/search";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUser, useSignUp } from "@clerk/clerk-expo";
import {
  formatVND,
  dateObjectToFullDateTime,
  dateObjectToDateTime,
} from "@/utils/ValueConverter";
import { Check } from "lucide-react-native";
import { getRoomByID_API } from "@/api/RoomServices";
import { placeBookingAPI } from "@/api/BookingServices";
import { HttpStatusCode } from "axios";
import ScreenSpinner from "@/components/ScreenSpinner";

const BookingInfoSection = ({
  hotelName,
  checkinTime,
  checkoutTime,
  numOfGuest,
  roomName,
  originPrice,
  discountedPrice,
  totalPrice,
}) => {
  return (
    <View style={styles.booking_info_container}>
      <Text style={styles.hotel_name_text}>{hotelName}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
          marginTop: 20,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Nhận phòng</Text>
        <Text
          style={[styles.content_text, { flex: 2, marginStart: 5 }]}
          numberOfLines={2}
        >
          {dateObjectToFullDateTime(checkinTime, "14", "00")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Trả phòng</Text>
        <Text
          style={[styles.content_text, { flex: 2, marginStart: 5 }]}
          numberOfLines={2}
        >
          {dateObjectToFullDateTime(checkoutTime, "12", "00")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Số lượng</Text>
        <Text
          style={[styles.content_text, { flex: 2, marginStart: 5 }]}
          numberOfLines={2}
        >
          {numOfGuest} khách
        </Text>
      </View>
      <View style={styles.divider} />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <View style={styles.bullet_point} />
        <Text style={[styles.label_text, { fontSize: 18, flex: 1 }]}>
          {roomName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Giá gốc</Text>
        <Text style={[styles.content_text, { textAlign: "right", flex: 2 }]}>
          {formatVND(originPrice)}đ
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Giá đã giảm</Text>
        <Text style={[styles.content_text, { textAlign: "right", flex: 2 }]}>
          -{formatVND(originPrice - discountedPrice)}đ
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Thuế & Phí</Text>
        <Text style={[styles.content_text, { textAlign: "right", flex: 2 }]}>
          {formatVND(totalPrice - discountedPrice)}đ
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Tổng giá</Text>
        <Text style={[styles.total_price_text, { textAlign: "right" }]}>
          {formatVND(totalPrice)}đ
        </Text>
      </View>
    </View>
  );
};

const FirstStepSection = ({
  fullName,
  email,
  phoneNumber,
  onFullNameChange,
  onEmailChange,
  onPhoneNumberChange,
  fullNameError,
  emailError,
  phoneNumberError,
  fullNameErrorMessage,
  emailErrorMessage,
  phoneNumberErrorMessage,
}) => {
  return (
    <View style={styles.booking_step_container}>
      <View style={styles.section_title_container}>
        <Text style={styles.section_title_text}>Bước 1: Thông tin cá nhân</Text>
      </View>
      <View style={styles.section_content_container}>
        <Text style={[styles.content_text, { textAlign: "justify" }]}>
          Vui lòng cho chúng tôi biết tên khách sẽ lưu trú tại phòng này chính
          xác như trên giấy tờ tùy thân sẽ sử dụng khi nhận phòng. Vui lòng nhập
          đầy đủ nếu khách mang họ kép (như Nguyễn Phước, Tôn Nữ, Lê Đoàn,
          v.v.).
        </Text>
        <InputField
          style={{ marginTop: 15 }}
          label="Họ tên"
          value={fullName}
          onChange={onFullNameChange}
          isError={fullNameError}
          errorMessage={fullNameErrorMessage}
        />
        <InputField
          style={{ marginTop: 5 }}
          label="Email"
          value={email}
          onChange={onEmailChange}
          isError={emailError}
          errorMessage={emailErrorMessage}
        />
        <InputField
          style={{ marginTop: 5 }}
          label="Số điện thoại"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          isError={phoneNumberError}
          errorMessage={phoneNumberErrorMessage}
        />
      </View>
    </View>
  );
};

const SecondStepSection = ({ extraOptionsName, roomInfo }) => {
  return (
    <View style={styles.booking_step_container}>
      <View style={styles.section_title_container}>
        <Text style={styles.section_title_text}>
          Bước 2: Kiểm tra thông tin phòng
        </Text>
      </View>
      <View style={styles.section_content_container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <View style={styles.bullet_point} />
          <Text style={[styles.label_text, { fontSize: 18, flex: 1 }]}>
            {roomInfo?.roomName}
          </Text>
        </View>
        <View style={{ marginTop: 5, paddingHorizontal: 15 }}>
          <Text style={styles.room_info_text}>
            Loại phòng:{" "}
            <Text style={{ fontWeight: 400 }}>{roomInfo?.roomType}</Text>
          </Text>
          <Text style={styles.room_info_text}>
            Số lượng giường:{" "}
            <Text style={{ fontWeight: 400 }}>{roomInfo?.numOfBeds}</Text>
          </Text>
          <Text style={styles.room_info_text}>
            Loại giường:{" "}
            <Text style={{ fontWeight: 400 }}>{roomInfo?.bedType}</Text>
          </Text>
          <Text style={styles.room_info_text}>
            Số lượng người lớn tối đa:{" "}
            <Text style={{ fontWeight: 400 }}>{roomInfo?.maxAdults}</Text>
          </Text>
          <Text style={styles.room_info_text}>
            Số lượng trẻ em tối đa:{" "}
            <Text style={{ fontWeight: 400 }}>{roomInfo?.maxChildren}</Text>
          </Text>
        </View>
      </View>
      {extraOptionsName && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            paddingHorizontal: 15,
          }}
        >
          <Check
            size={20}
            color={COLOR.secondary_green_100}
            strokeWidth={2.5}
          />
          <Text style={styles.breakfast_text}>Bao gồm: {extraOptionsName}</Text>
        </View>
      )}
    </View>
  );
};

const ThirdStepSection = ({
  selectedOption,
  onDirectOptionSelect,
  onOnlineOptionSelect,
}) => {
  return (
    <View style={styles.booking_step_container}>
      <View style={styles.section_title_container}>
        <Text style={styles.section_title_text}>
          Bước 3: Phương thức thanh toán
        </Text>
      </View>
      <View style={styles.section_content_container}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <BouncyCheckbox
            size={20}
            fillColor={COLOR.primary_blue_100}
            useBuiltInState={false}
            isChecked={selectedOption === "0"}
            onPress={onDirectOptionSelect}
          />
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.option_text}
          >
            Thanh toán tại khách sạn
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <BouncyCheckbox
            size={20}
            fillColor={COLOR.primary_blue_100}
            useBuiltInState={false}
            isChecked={selectedOption === "1"}
            onPress={onOnlineOptionSelect}
          />
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.option_text}
          >
            Thanh toán trực tuyến
          </Text>
        </View>
        <Text
          style={[
            styles.content_text,
            { textAlign: "justify", marginVertical: 10 },
          ]}
        >
          Chấp nhận thanh toán thông qua các thẻ tín dụng và ví điện tử hiện
          hành:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Image
            style={[styles.payment_logo, { width: 57 }]}
            source={require("@/assets/images/MasterCard_Logo.png")}
          />
          <Image
            style={styles.payment_logo}
            source={require("@/assets/images/MoMo_Logo.png")}
          />
          <Image
            style={[styles.payment_logo, { width: 57 }]}
            source={require("@/assets/images/Visa_Logo.png")}
          />
          <Image
            style={styles.payment_logo}
            source={require("@/assets/images/VNPay_Logo.png")}
          />
        </View>
        <View style={[styles.divider, { marginVertical: 30 }]} />
        <Text style={[styles.content_text, { textAlign: "justify" }]}>
          Để đảm bảo quyền lợi giữa Quý khách và khách sạn, chúng tôi yêu cầu
          thêm thông tin về thẻ tín dụng. Chúng tôi cam kết sử dụng phương thức
          truyền tải an toàn để bảo vệ thông tin cá nhân của Quý khách.
        </Text>
      </View>
    </View>
  );
};

const CancelPolicySection = ({ policies }) => {
  return (
    <View style={[styles.booking_info_container, { marginTop: 20 }]}>
      <Text style={[styles.label_text, { fontSize: 18 }]}>Chính sách hủy</Text>
      {policies.map((policy, index) => (
        <View key={index} style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={[styles.content_text, { marginHorizontal: 5 }]}>
            {index + 1}.
          </Text>
          <Text
            style={[styles.content_text, { flex: 1, textAlign: "justify" }]}
          >
            {policy}
          </Text>
        </View>
      ))}
      <Text
        style={[styles.content_text, { marginTop: 10, textAlign: "justify" }]}
      >
        * Thời gian được tính theo giờ địa phương hiện tại của Quý khách (GMT
        +7)
      </Text>
    </View>
  );
};

const BookingScreen = () => {
  const { user } = useUser();
  // console.log(user.id);

  const cancelDue = new Date();
  cancelDue.setDate(cancelDue.getDate() + 3);

  const unCancelDue = new Date();
  unCancelDue.setDate(unCancelDue.getDate() + 7);

  const policies = [
    `Quý khách được hủy miễn phí đến ${dateObjectToDateTime(
      cancelDue,
      "00",
      "00"
    )}`,
    `Nếu Quý khách thay đổi hoặc hủy đặt phòng sau ${dateObjectToDateTime(
      cancelDue,
      "00",
      "00"
    )}, Quý khách sẽ phải thanh toán phí tương đương 1 đêm (gồm thuế).`,
    `Nếu Quý khách thay đổi hoặc hủy đặt phòng sau ${dateObjectToDateTime(
      unCancelDue,
      "00",
      "00"
    )}, Quý khách sẽ không được hoàn trả bất kỳ khoản thanh toán nào.`,
  ];

  const router = useRouter();

  const {
    roomID,
    hotelName,
    checkinDate,
    checkoutDate,
    guestNumber,
    extraOptionsName,
  } = useLocalSearchParams();

  const [selectedOption, setSelectedOption] = useState("0");
  const [roomInfo, setRoomInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  //Input states:
  const [fullName, setFullName] = useState("");
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState(" ");

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(" ");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(" ");

  //Other states
  const [generalErrorMessage, setGeneralErrorMessage] = useState(" ");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const getRoomInfo = async (roomID) => {
      setLoading(true);
      try {
        const response = await getRoomByID_API(roomID);
        if (response.status === HttpStatusCode.Ok) {
          setRoomInfo(response.data);
        }
      } catch (err) {
        console.log("Error in getRoomInfo: ", err);
      } finally {
        setLoading(false);
      }
    };

    getRoomInfo(roomID);
  }, []);

  const onBackPress = () => {
    router.back();
  };

  const handleDirectOptionSelect = () => {
    setSelectedOption("0");
  };

  const handleOnlineOptionSelect = () => {
    setSelectedOption("1");
  };

  const handleConfirmBookingPress = async (
    fullName,
    email,
    phoneNumber,
    selectedOption
  ) => {
    const phoneRegex =
      "^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setButtonLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200)); // make the button to load for 200ms

    if (!phoneNumber.match(phoneRegex) || !email.match(emailRegex)) {
      if (!phoneNumber.match(phoneRegex)) {
        setPhoneNumberErrorMessage("Số điện thoại không hợp lệ");
        setGeneralErrorMessage("Vui lòng kiểm tra lại các Thông tin cá nhân");
      }
      if (!email.match(emailRegex)) {
        setEmailErrorMessage("Email không hợp lệ");
        setGeneralErrorMessage("Vui lòng kiểm tra lại các Thông tin cá nhân");
      }
      setButtonLoading(false);
    } else {
      try {
        const bookingInfo = {
          userID: user.id,
          hotelID: roomInfo?.hotelId,
          roomID: roomInfo?.id,
          roomName: roomInfo?.roomName,
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          paymentMethod: selectedOption === "0" ? "offline" : "online",
          bookingDate: new Date().toISOString(),
          checkinDate: new Date(checkinDate).toISOString(),
          checkoutDate: new Date(checkoutDate).toISOString(),
          cancelDue: cancelDue.toISOString(),
          unCancelDue: unCancelDue.toISOString(),
        };

        const response = await placeBookingAPI(bookingInfo);
        if (response.status === HttpStatusCode.Created) {
          router.replace({
            pathname: "/booking/booking-status",
            params: {
              isSuccess: true,
            },
          });
        }
      } catch (err) {
        console.log("Error in handleConfirmBookingPress: ", err);
        setGeneralErrorMessage("Đã xảy ra lỗi, vui lòng thử lại sau");
      } finally {
        setButtonLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <GeneralHeader title="Chi tiết đặt phòng" onBackPress={onBackPress} />
      {loading ? (
        <ScreenSpinner />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <BookingInfoSection
            hotelName={hotelName}
            checkinTime={new Date(checkinDate)}
            checkoutTime={new Date(checkoutDate)}
            numOfGuest={guestNumber}
            roomName={roomInfo?.roomName}
            originPrice={roomInfo?.originPrice}
            discountedPrice={roomInfo?.discountedPrice}
            totalPrice={roomInfo?.totalPrice}
          />
          <FirstStepSection
            fullName={fullName}
            email={email}
            phoneNumber={phoneNumber}
            onFullNameChange={(text) => {
              setFullName(text);
              setFullNameErrorMessage(" ");
              setGeneralErrorMessage(" ");
            }}
            onEmailChange={(text) => {
              setEmail(text);
              setEmailErrorMessage(" ");
              setGeneralErrorMessage(" ");
            }}
            onPhoneNumberChange={(text) => {
              setPhoneNumber(text);
              setPhoneNumberErrorMessage(" ");
              setGeneralErrorMessage(" ");
            }}
            fullNameErrorMessage={fullNameErrorMessage}
            emailErrorMessage={emailErrorMessage}
            phoneNumberErrorMessage={phoneNumberErrorMessage}
          />
          <SecondStepSection
            extraOptionsName={extraOptionsName}
            roomInfo={roomInfo}
          />
          <ThirdStepSection
            selectedOption={selectedOption}
            onDirectOptionSelect={handleDirectOptionSelect}
            onOnlineOptionSelect={handleOnlineOptionSelect}
          />
          <CancelPolicySection policies={policies} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={[styles.content_text, { textAlign: "justify" }]}>
              Bằng việc bấm <Text style={{ fontWeight: 600 }}>"Đặt phòng"</Text>
              , chúng tôi mặc định Quý khách xác nhận đã đọc và đồng ý{" "}
              <Text style={{ fontWeight: 600 }}>
                Điều khoản & Điều kiện, Chính sách bảo mật và Hướng dẫn du lịch
                của chính phủ
              </Text>{" "}
              của Hotelligence.
            </Text>
            <Text style={styles.error_text}>{generalErrorMessage}</Text>
            <SubmitButton
              text="Xác nhận đặt phòng"
              disabled={fullName === "" || email === "" || phoneNumber === ""}
              isLoading={buttonLoading}
              style={{ marginTop: 20 }}
              onPress={() =>
                handleConfirmBookingPress(
                  fullName,
                  email,
                  phoneNumber,
                  selectedOption
                )
              }
            />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
  },

  booking_step_container: {
    paddingBottom: 25,
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 10,
  },

  section_content_container: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  section_title_container: {
    justifyContent: "center",
    backgroundColor: COLOR.primary_blue_100,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    padding: 15,
  },

  section_title_text: {
    color: COLOR.primary_gold_100,
    fontSize: 20,
    fontWeight: 500,
  },

  label_text: {
    fontSize: 16,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
  },

  content_text: {
    fontSize: 16,
    fontWeight: 400,
    color: COLOR.primary_blue_100,
    // marginStart: 5,
  },

  error_text: {
    marginTop: 15,
    fontSize: 14,
    color: COLOR.secondary_red_100,
  },

  //Booking Info Section
  booking_info_container: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 10,
  },

  hotel_name_text: {
    fontSize: 24,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
    textAlign: "center",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
    marginVertical: 20,
  },

  bullet_point: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLOR.primary_blue_100,
    marginEnd: 10,
  },

  total_price_text: {
    color: COLOR.primary_gold_120,
    fontSize: 24,
    fontWeight: 500,
  },

  //First Step Section

  //Second Step Section
  breakfast_text: {
    fontSize: 16,
    color: COLOR.secondary_green_100,
    fontWeight: 500,
    marginStart: 5,
  },

  room_info_text: {
    fontSize: 16,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
    marginVertical: 5,
  },

  //Third Step Section
  option_text: {
    fontWeight: 500,
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

  payment_logo: {
    width: 32,
    height: 32,
  },
});

export default BookingScreen;
