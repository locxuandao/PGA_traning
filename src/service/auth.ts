import { AxiosResponse } from "axios";

import { httpDiv3, httpDiv4 } from "utils/api/http";
import { ILoginFormModel } from "types/Authentication";
import { IRegisterModel } from "types/Authentication";

export const login = async (payload: ILoginFormModel) => {
  const response: AxiosResponse = await httpDiv4.post(
    "/authentication/login",
    payload,
  );

  return response?.data;
};

export const register = async (paylaod: IRegisterModel) => {
  const response: AxiosResponse = await httpDiv3.post(`auth/register`, paylaod);

  return response?.data?.data;
};
