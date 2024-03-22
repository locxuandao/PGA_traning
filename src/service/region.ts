import { AxiosResponse } from "axios";

import { Region } from "types/Region";
import { httpDiv3 } from "utils/api/http";

export const getAllRegions = async (): Promise<Region[]> => {
  const response: AxiosResponse = await httpDiv3.get("/location");

  return response?.data?.data;
};
