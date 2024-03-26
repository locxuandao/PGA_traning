import { AxiosResponse } from "axios";
import { State } from "types/State";
import { http } from "utils/api/http";

export const getStateByPid = async (pid: number): Promise<State[]> => {
  const response: AxiosResponse = await http.get(`/location?pid=${pid}`);

  return response?.data?.data;
};
