import axios from "axios";
import { getDataFromCookie, setDataToCookie } from "@token-service";

const request = axios.create({
  baseURL: "http://store.go-clothes.uz:5555",
});

async function refreshAccessToken() {
  try {
    const refresh_token = getDataFromCookie("refresh_token");

    if (!refresh_token) {
      throw new Error("refresh token yo'q");
    }

    const response = await axios.post(
      `http://store.go-clothes.uz:5555/v1/token/${refresh_token}`
    );

    const new_access_token = response.data;
    const new_refresh_token = response.data.refresh_token;
    if (new_access_token && new_refresh_token) {
      setDataToCookie("access_token", new_access_token);
      setDataToCookie("refresh_token", new_refresh_token);
    }
    return new_access_token;
  } catch (error) {
    console.log(error);
  }
}

request.interceptors.request.use((config) => {
  const access_token = getDataFromCookie("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers[`Authorization`] = access_token;
      } else {
        console.log(
          `Failed to refresh acces token. Redicarting to login page...`
        );
        return Promise.reject(error);
      }
    }
  }
);


export default request;
