import { AxiosResponse } from "axios";

import { http } from "utils/api/http";
import { LoginFormModel } from "types/Authentication";
import { RegisterModel } from "types/Authentication";

export const login = async (payload: LoginFormModel) => {
  const response: AxiosResponse = await http.post("/auth/login", payload);

  return response?.data?.data;
};

export const register = async (paylaod: RegisterModel) => {
  const response: AxiosResponse = await http.post(`auth/register`, paylaod);

  return response?.data?.data;
};
