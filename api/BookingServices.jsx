import MyAxios from "@/utils/MyAxios";

const endpoints = {
  PLACE_BOOKING: "/bookings/placeBooking",
};

export const placeBookingAPI = async (bookingInfo) => {
  try {
    const response = await MyAxios.post(
      `${endpoints.PLACE_BOOKING}/${bookingInfo.roomID}`,
      {
        userId: bookingInfo.userID,
        hotelId: bookingInfo.hotelID,
        roomName: bookingInfo.roomName,
        fullName: bookingInfo.fullName,
        email: bookingInfo.email,
        phoneNumber: bookingInfo.phoneNumber,
        paymentMethod: bookingInfo.paymentMethod,
        bookingDate: bookingInfo.bookingDate,
        checkinDate: bookingInfo.checkinDate,
        checkoutDate: bookingInfo.checkoutDate,
        cancelDue: bookingInfo.cancelDue,
        unCancelDue: bookingInfo.unCancelDue,
      }
    );
    return response;
  } catch (error) {
    console.log("Error in placeBookingAPI: ", error);
  }
};
