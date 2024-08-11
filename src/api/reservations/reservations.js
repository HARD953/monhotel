import {configHeadersToken, instanceAxios, instanceAxiosWithoutSite } from "../axiosInstance";

// ajouter un utilisateur
export const addReservation = async(body)=>{
    try {
        const config = await configHeadersToken();
        const response = await instanceAxiosWithoutSite.post(
          `chambres/${body?.chambreId}/reservations`,
          body,
          config
        );
        return response
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}

// recuperation de la liste des utilisateurs en attentes
export const getReservationsEnAttentes = async () => {
  try {
    const config = await configHeadersToken();
    const response = await instanceAxios.get(`reservations/me/en_attentes`, config);
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// recuperation de la liste des utilisateurs en cours
export const getReservationsEnCours = async () => {
  try {
    const config = await configHeadersToken();
    const response = await instanceAxios.get(`reservations/me/en_cours`, config);
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// recuperation de la liste des utilisateurs annulées
export const getReservationsAnnulees = async () => {
  try {
    const config = await configHeadersToken();
    const response = await instanceAxios.get(`reservations/me/annulees`, config);
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// recuperation de la liste des utilisateurs terminées
export const getReservationsTerminees = async () => {
  try {
    const config = await configHeadersToken();
    const response = await instanceAxios.get(`reservations/me/terminees`, config);
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};





// recuperation de la liste des utilisateurs
export const getReservationsByStatut = async (statut) => {
  try {
    const response = await instanceAxios.get(
      `reservations/${statut}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// recuperation d'un utilisateur
export const getReservation = async (id) => {
  try {
    const response = await instanceAxios.get(
      `reservations/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};




// mettre a jour un utilisateurs
export const updateReservation = async (id, body) => {
  try {
    const response = await instanceAxios.put(`reservations/${id}`, body);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// Supprimer un utilisateurs
export const deleteReservation = async (id) => {
  try {
    const response = await instanceAxios.delete(
      `reservations/${id}/`,
      configHeadersToken()
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// modifier le statut d'une reservation
export const updateSatutReservation = async (id, payload) => {
  try {
    const response = await instanceAxios.put(
      `reservations/change-statut/${id}/`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// generer facture reservation
export const genererFactureReservation = async (id, payload) => {
  try {
    const response = await instanceAxios.post(
      `reservations/${id}/factures/generer`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};
