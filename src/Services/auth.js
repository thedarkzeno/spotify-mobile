import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "SPOTIFY";

export const getToken = async () =>
  await AsyncStorage.getItem(TOKEN_KEY + "_Token");


export const isAuthenticated = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("error isAuthenticated");
    return false;
  }
};

export const login = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY + "_Token", token);
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY + "_Token");
};
