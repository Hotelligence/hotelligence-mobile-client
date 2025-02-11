import MyAxios from "@/utils/MyAxios";

const endpoints = {
  GET_REVIEW: "/reviews/getReviewsByHotelId",
};

export const getReviewsByHotelID_API = async (hotelID) => {
  try {
    const response = await MyAxios.get(`${endpoints.GET_REVIEW}/${hotelID}`);
    return response;
  } catch (error) {
    console.log("Error in getReviewsByHotelIdAPI: ", error);
  }
}