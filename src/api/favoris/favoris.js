import {configHeadersToken, instanceAxios, instanceAxiosWithoutSite } from "../axiosInstance";

// ajouter un utilisateur
export const addFavoris = async(body)=>{
    try {
        const config = await configHeadersToken();
        const response = await instanceAxios.post(
          `favoris`,
          body,
          config
        );
        return response
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}

// recuperation de la liste des utilisateurs en attentes
export const getFavoris = async () => {
  try {
    const config = await configHeadersToken();
    const response = await instanceAxios.get(`favoris`, config);
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// recuperation de la liste des utilisateurs en cours
export const deleteFavoris = async (body) => {
  try {
    const config = await configHeadersToken();
    const response = await instanceAxios.delete(
      `favoris/${body?.chambreId}`,
      config
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};
