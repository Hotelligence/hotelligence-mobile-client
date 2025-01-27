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
import { InputField, AmenityDisplay, SubmitButton } from "@/components/search";
import { useRouter } from "expo-router";
import { bookingConfirmation } from "@/assets/TempData"; //delete later
import { isoStringToFullDateTime, formatVND } from "@/utils/ValueConverter";
import { Check } from "lucide-react-native";

const BookingInfoSection = ({ bookingInfo }) => {
  return (
    <View style={styles.booking_info_container}>
      <Text style={styles.hotel_name_text}>{bookingInfo.hotelName}</Text>
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
          {isoStringToFullDateTime(bookingInfo?.checkinTime)}
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
          {isoStringToFullDateTime(bookingInfo?.checkoutTime)}
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
          {bookingInfo?.numOfRooms} phòng, {bookingInfo?.numOfNights} đêm
        </Text>
      </View>
      <View style={styles.divider} />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <View style={styles.bullet_point} />
        <Text style={[styles.label_text, { fontSize: 18, flex: 1 }]}>
          {bookingInfo?.roomName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={[styles.label_text, { flex: 1 }]}>Giá phòng</Text>
        <Text style={[styles.content_text, { textAlign: "right", flex: 2 }]}>
          {formatVND(bookingInfo?.roomPrice)}đ
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
          {formatVND(bookingInfo?.taxAndFee)}đ
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
          {formatVND(bookingInfo?.totalPrice)}đ
        </Text>
      </View>
    </View>
  );
};

const FirstStepSection = ({}) => {
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
        <InputField style={{ marginTop: 15 }} label="Họ tên" />
        <InputField style={{ marginTop: 10 }} label="Email" />
        <InputField style={{ marginTop: 10 }} label="Số điện thoại" />
      </View>
    </View>
  );
};

const SecondStepSection = ({ bookingInfo }) => {
  const firstColumn = bookingInfo?.amenities.slice(
    0,
    Math.ceil(bookingInfo?.amenities.length / 2)
  );
  const secondColumn = bookingInfo?.amenities.slice(
    Math.ceil(bookingInfo?.amenities.length / 2)
  );

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
            {bookingInfo?.roomName}
          </Text>
        </View>
        <View style={styles.amenities_list_container}>
          <View style={{ flex: 1 }}>
            {firstColumn.map((amenity) => (
              <AmenityDisplay
                key={amenity.id}
                iconName={amenity.amenityIconName}
                label={amenity.amenityName}
                style={{ width: "85%", marginVertical: 2 }}
              />
            ))}
          </View>
          <View style={{ flex: 1, marginStart: 5 }}>
            {secondColumn.map((amenity) => (
              <AmenityDisplay
                key={amenity.id}
                iconName={amenity.amenityIconName}
                label={amenity.amenityName}
                style={{ width: "85%", marginVertical: 2 }}
              />
            ))}
          </View>
        </View>
      </View>
      {bookingInfo?.isBreakfastProvided && (
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
          <Text style={styles.breakfast_text}>
            Bao gồm: Bữa sáng cho {bookingInfo?.numOfBreakfastProvided} người
          </Text>
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
          <Image source={require("@/assets/images/MasterCard_Logo.png")} />
          <Image source={require("@/assets/images/MoMo_Logo.png")} />
          <Image source={require("@/assets/images/Visa_Logo.png")} />
          <Image source={require("@/assets/images/VNPay_Logo.png")} />
        </View>
        <View style={[styles.divider, { marginVertical: 30 }]} />
        <Text style={[styles.content_text, { textAlign: "justify" }]}>
          Để đảm bảo quyền lợi giữa Quý khách và khách sạn, chúng tôi yêu cầu
          thêm thông tin về thẻ tín dụng. Chúng tôi cam kết sử dụng phương thức
          truyền tải an toàn để bảo vệ thông tin cá nhân của Quý khách.
        </Text>
        <InputField style={{ marginTop: 15 }} label="Số thẻ" />
        <View style={{ flexDirection: "row" }}>
          <InputField style={{ marginTop: 10, flex: 1 }} label="Ngày hết hạn" />
          <InputField
            style={{ marginTop: 10, flex: 1, marginStart: 20 }}
            label="Mã CVV"
          />
        </View>
      </View>
    </View>
  );
};

const CancelPolicySection = ({}) => {
  const policies = [
    "Quý khách được hủy miễn phí đến 18:00 19/04/2024.",
    "Nếu Quý khách thay đổi hoặc hủy đặt phòng sau 18:00 19/04/2024, Quý khách sẽ phải thanh toán phí tương đương 1 đêm (gồm thuế).",
    "Nếu Quý khách thay đổi hoặc hủy đặt phòng sau 09:00 21/04/2024, Quý khách sẽ không được hoàn trả bất kỳ khoản thanh toán nào.",
  ];

  return (
    <View style={[styles.booking_info_container, { marginTop: 20 }]}>
      <Text style={[styles.label_text, { fontSize: 18 }]}>Chính sách hủy</Text>
      {policies.map((policy, index) => (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
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
        *Thời gian được tính theo giờ địa phương hiện tại của Quý khách (GMT +7)
      </Text>
    </View>
  );
};

const BookingConfirmation = () => {
  const router = useRouter();

  const onBackPress = () => {
    router.back();
  };

  const [selectedOption, setSelectedOption] = useState("0");

  const handleDirectOptionSelect = () => {
    setSelectedOption("0");
  };

  const handleOnlineOptionSelect = () => {
    setSelectedOption("1");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <GeneralHeader title="Chi tiết đặt phòng" onBackPress={onBackPress} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <BookingInfoSection bookingInfo={bookingConfirmation} />
        <FirstStepSection />
        <SecondStepSection bookingInfo={bookingConfirmation} />
        <ThirdStepSection
          selectedOption={selectedOption}
          onDirectOptionSelect={handleDirectOptionSelect}
          onOnlineOptionSelect={handleOnlineOptionSelect}
        />
        <CancelPolicySection />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.content_text, { textAlign: "justify" }]}>
            Bằng việc bấm <Text style={{ fontWeight: 600 }}>"Đặt phòng"</Text>,
            chúng tôi mặc định Quý khách xác nhận đã đọc và đồng ý{" "}
            <Text style={{ fontWeight: 600 }}>
              Điều khoản & Điều kiện, Chính sách bảo mật và Hướng dẫn du lịch
              của chính phủ
            </Text>{" "}
            của Hotelligence.
          </Text>
          <SubmitButton
            text="Xác nhận đặt phòng"
            style={{ marginTop: 20 }}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
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
    marginHorizontal: 10,
  },

  total_price_text: {
    color: COLOR.primary_gold_120,
    fontSize: 24,
    fontWeight: 500,
  },

  //First Step Section

  //Second Step Section
  amenities_list_container: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "space-between",
  },

  breakfast_text: {
    fontSize: 16,
    color: COLOR.secondary_green_100,
    fontWeight: 500,
    marginStart: 5,
  },

  //Third Step Section
  option_text: {
    fontWeight: 500,
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },
});

export default BookingConfirmation;
