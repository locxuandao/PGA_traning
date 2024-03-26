import { AxiosResponse } from "axios";

import { http } from "utils/api/http";
import { ILoginFormModel } from "types/Authentication";
import { IRegisterModel } from "types/Authentication";

export const login = async (payload: ILoginFormModel) => {
  const response: AxiosResponse = await http.post("/auth/login", payload);

  return response?.data?.data;
};

export const register = async (paylaod: IRegisterModel) => {
  const response: AxiosResponse = await http.post(`auth/register`, paylaod);

  return response?.data?.data;
};
