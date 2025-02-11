import AsyncStorage from "@react-native-async-storage/async-storage";

const AppProperty = {
    APP_NAME: "Hotelligence",
};

const MyAsyncStorage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(
        `${AppProperty.APP_NAME}_${key}`,
        JSON.stringify(value)
      );
    } catch (error) {
      console.log("setItem error: ", error);
    }
  },
  getItem: async (key) => {
    try {
      const result = await AsyncStorage.getItem(
        `${AppProperty.APP_NAME}_${key}`
      );
      return JSON.parse(result);
    } catch (error) {
      console.log("getItem error: ", error);
    }
  },

  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(`${AppProperty.APP_NAME}_${key}`);
    } catch (error) {
      console.log("removeItem error: ", error);
    }
  },
};

export default MyAsyncStorage;
