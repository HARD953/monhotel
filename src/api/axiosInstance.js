import axios from "axios";
import { getAuthToken } from "@/services/authService";

export const token_app = "site_myhot_token";
export const main_app_path = "https://myhot-server.up.railway.app/api/v0/site/";
export const main_app_path_without_site = "https://myhot-server.up.railway.app/api/v0/";
export const main_app_path_files = "https://myhot-server.up.railway.app/";

export const instanceAxios = axios.create({
  baseURL: main_app_path,
  withCredentials: true,
});

export const instanceAxiosWithoutSite = axios.create({
  baseURL: main_app_path_without_site,
  withCredentials: true,
});

instanceAxios.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const newToken = await refreshAccessToken();
      // console.log("newToekn ::: ", newToken);
      // localStorage.setItem('accessToken', newToken);
      // localStorage.removeItem('accessToken-audit-visibility');
      localStorage.clear();

      // originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axios(originalRequest);
    }
  }
);

export const configHeadersToken = async () => {
  const token = await getAuthToken();
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};

export const configHeadersFormDataToken = async () => {
  const token = await getAuthToken();
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
};

// const refreshAccessToken = async () => {
//   const response = await instanceAxiosWithoutSite.post('token/refresh/', {
//     refresh: localStorage.getItem('refreshToken'),
//   });
//   return response.data.access_token;
// };
