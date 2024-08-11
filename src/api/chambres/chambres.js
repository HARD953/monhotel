import { instanceAxios } from "../axiosInstance";


//Toutes les chambres
export const getAllChambres = async (filtersChambre={}) => {
  try {
    const response = await instanceAxios.get(`chambres_libres`, {
      params: filtersChambre,
    });
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.messages);
  }
};

//Toutes les chambres dans details chambres
export const getAllOthersChambres = async()=>{
    try {
        const response = await instanceAxios.get(
          `chambres_libres/`
        );
        return response?.data || []
    } catch (error) {
    throw new Error(error?.response?.data?.messages);
    }
}



//Recuperation informations sur une chambres
export const getChambre = async(id)=>{
    try {
        const response = await instanceAxios.get(`chambres_libres/${id}/`);
        return response?.data || []
    } catch (error) {
    throw new Error(error?.response?.data?.messages);
    }
}

//Recuperation informations sur une chambres
export const getDateFreeForReservationByChambre = async (id) => {
  try {
    const response = await instanceAxios.get(
      `chambres_libres/${id}/periode_reservations`
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.messages);
  }
};


//Recuperation informations sur une chambres
export const getChambresFilted = async (filtersChambre) => {
  try {
    const response = await instanceAxios.get(`chambres/filtered`, {
      params: filtersChambre,
    });
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.messages);
  }
};


// recuperation evaluation d'une chambre
export const getEvaluationByChambreIdAndStatus = async (id, approuve = null) => {
  try {
    const response = await instanceAxios.get(`evaluations/chambre/${id}`, {
      
      params: {
        approuve: approuve,
      },
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};



// recuperation evaluation toutes les valeures des notes d'une chambre
export const getEvaluationByChambreIdAndStatusSum = async (id, approuve = true) => {
  try {
    const response = await instanceAxios.get(
      `evaluations/chambre/${id}/all_evaluations`,
      {
        params: {
          approuve: approuve,
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};