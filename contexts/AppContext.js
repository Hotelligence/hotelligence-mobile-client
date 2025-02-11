import { createContext, useState, useContext } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getFavoriteHotelAPI } from "@/api/HotelServices";
import { HttpStatusCode } from "axios";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const { user } = useUser();
  const [userFavoriteList, setUserFavoriteList] = useState([]);

  const fetchUserFavoriteList = async () => {
    try {
      const response = await getFavoriteHotelAPI(user.id);
      if (response.status === HttpStatusCode.Ok) {
        if (response?.data?.favoriteHotels) {
          setUserFavoriteList(response?.data?.favoriteHotels);
        }
      }
    } catch (error) {
      console.log("Error in fetchUserFavoriteList: ", error);
    }
  };

  const value = {
    userFavoriteList,
    setUserFavoriteList,
    
    fetchUserFavoriteList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return appContext;
};
