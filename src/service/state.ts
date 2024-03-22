import { AxiosResponse } from "axios";
import { State } from "types/State";
import { httpDiv3 } from "utils/api/http";

export const getStateByPid = async (pid: number): Promise<State[]> => {
  const response: AxiosResponse = await httpDiv3.get(`/location?pid=${pid}`);

  return response?.data?.data;
};
