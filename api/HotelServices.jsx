import MyAxios from "@/utils/MyAxios";

const endpoints = {
  SEARCH: "/hotels/searchResult",
  GET_HOTEL: "/hotels/getHotelById",
  GET_FAVORITE_HOTEL: "/favorites/getFavoriteListByUserId",
  ADD_FAVORITE_HOTEL: "/favorites/addToFavoriteList",
  REMOVE_FAVORITE_HOTEL: "/favorites/removeFromFavoriteList",
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

export const getFavoriteHotelAPI = async (userID) => {
  try {
    const response = await MyAxios.get(`${endpoints.GET_FAVORITE_HOTEL}/${userID}`);
    return response;
  } catch (error) {
    console.log("Error in getFavoriteHotelAPI: ", error);
  }
}

export const addFavoriteHotelAPI = async (userID, hotelID) => {
  try {
    const response = await MyAxios.post(`${endpoints.ADD_FAVORITE_HOTEL}/${userID}/${hotelID}`);
    return response;
  } catch (error) {
    console.log("Error in addFavoriteHotelAPI: ", error);
  }
}

export const removeFavoriteHotelAPI = async (userID, hotelID) => {
  try {
    const response = await MyAxios.post(
      `${endpoints.REMOVE_FAVORITE_HOTEL}/${userID}/${hotelID}`
    );
    return response;
  } catch (error) {
    console.log("Error in removeFavoriteHotelAPI: ", error);
  }
}