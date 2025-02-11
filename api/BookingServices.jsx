import MyAxios from "@/utils/MyAxios";

const endpoints = {
  PLACE_BOOKING: "/bookings/placeBooking",
  GET_USER_BOOKING: "/bookings/getBookingsByUserId",
  CANCEL_BOOKING: "/bookings/cancelBooking",
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

export const getUserBookingAPI = async (userID) => {
  try {
    const response = await MyAxios.get(`${endpoints.GET_USER_BOOKING}/${userID}`);
    return response;
  } catch (error) {
    console.log("Error in getUserBookingAPI: ", error);
  }
}

export const cancelBookingAPI = async (bookingID) => {
  try {
    const response = await MyAxios.patch(`${endpoints.CANCEL_BOOKING}/${bookingID}`);
    return response;
  } catch (error) {
    console.log("Error in cancelBookingAPI: ", error);
  }
}