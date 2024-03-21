import { AxiosResponse } from "axios";

import http from "utils/api/http";
import { ILoginFormModel } from "types/Authentication";

export const login = async (payload: ILoginFormModel) => {
  const response: AxiosResponse = await http.post(
    "/authentication/login",
    payload,
  );

  return response?.data;
};
