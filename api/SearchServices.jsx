import MyAxios from "@/utils/MyAxios";

const endpoints = "/hotels/searchResult";

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
    const response = await MyAxios.get(endpoints, {
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