import MyAxios from "@/utils/MyAxios";

const endpoints = {
  SEARCH: "/hotels/searchResult",
  GET_HOTEL: "/hotels/getHotelById",
};

export const getSearchResultAPI = async (
  query,
  from,
  to,
  guests,
  priceRange,
  minRatingScore,
  stars,
  sortBy,
  sortOrder,
) => {
  try {
    const response = await MyAxios.get(endpoints.SEARCH, {
      params: {
        query,
        from,
        to,
        guests,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minRatingScore,
        stars,
        sortBy,
        sortOrder,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in getSearchResultAPI: ", error);
  }
};

export const getHotelByID_API = async (hotelID) => {
  try {
    const response = await MyAxios.get(`${endpoints.GET_HOTEL}/${hotelID}`);
    return response;
  } catch (error) {
    console.log("Error in getHotelByID: ", error);
  }
};