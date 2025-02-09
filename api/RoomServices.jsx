import MyAxios from "@/utils/MyAxios";

const endpoints = {
  GET_ROOM: "/rooms/getRoomById",
  GET_ROOM_IN_HOTEL: "/rooms/getRoomsInHotel",
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
