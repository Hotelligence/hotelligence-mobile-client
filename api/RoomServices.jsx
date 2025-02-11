import MyAxios from "@/utils/MyAxios";

const endpoints = {
  GET_ROOM: "/rooms/getRoomById",
  GET_ROOM_IN_HOTEL: "/rooms/getRoomsInHotel",
  REVIEW_ROOM: "/reviews/writeReview",
};

export const getRoomByID_API = async (roomID) => {
  try {
    const response = await MyAxios.get(`${endpoints.GET_ROOM}/${roomID}`);
    return response;
  } catch (error) {
    console.log("Error in getRoomByID: ", error);
  }
};

export const getRoomsInHotelAPI = async (hotelID) => {
  try {
    const response = await MyAxios.get(
      `${endpoints.GET_ROOM_IN_HOTEL}/${hotelID}`
    );
    return response;
  } catch (error) {
    console.log("Error in getRoomsOfHotel: ", error);
  }
};


export const reviewRoomAPI = async (roomID, hotelID, reviewInfo) => {
  try {
    const response = await MyAxios.post(
      `${endpoints.REVIEW_ROOM}/${roomID}`,
      {
        hotelId: hotelID,
        userId: reviewInfo.userId,
        userName: reviewInfo.userName,
        cleanPoint: reviewInfo.cleanPoint,
        servicePoint: reviewInfo.servicePoint,
        staffPoint: reviewInfo.staffPoint,
        facilityPoint: reviewInfo.facilityPoint,
        environmentPoint: reviewInfo.environmentPoint,
        comment: reviewInfo.comment,
        reviewDate: reviewInfo.reviewDate,
      }
    );
    return response;
  } catch (error) {
    console.log("Error in reviewRoomAPI: ", error);
  }
}