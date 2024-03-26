import { AxiosResponse } from "axios";

import { Region } from "types/Region";
import { http } from "utils/api/http";

export const getAllRegions = async (): Promise<Region[]> => {
  const response: AxiosResponse = await http.get("/location");

  return response?.data?.data;
};
