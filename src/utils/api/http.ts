import axios, { AxiosResponse } from "axios";
import configs from "configs";

import { getTokens, removeItemFromStorage } from "utils/storage";

const http = axios.create({
  baseURL: configs.apiEndpoint,
});

http.interceptors.request.use(
  function (config: any) {
    const { token } = getTokens();
    if (token && config) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  async function (response: AxiosResponse) {
    return response;
  },
  async function (error: any) {
    const { response } = error;
    const { errorCode } = response?.data?.errors;

    if (errorCode === "Unauthorized") {
      removeItemFromStorage("tokens");
      window.location.replace("/");
    }

    return Promise.reject(error?.response?.data);
  },
);

export { http };
