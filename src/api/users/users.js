import { configHeadersToken, instanceAxios, instanceAxiosWithoutSite } from "../axiosInstance";

//Connexion de l'utilisateur
export const loginUser = async (userInfo) => {
  try {
    return await instanceAxiosWithoutSite.post("users/auth/login", userInfo);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données:",
      error?.message
    );
    throw error;
  }
};

// recuperation informations utilisateur
export const getLoginInfos = async (id) => {
  try {

    const config = await configHeadersToken();
    const response = await instanceAxios.get(`users/infos`, config);
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};
