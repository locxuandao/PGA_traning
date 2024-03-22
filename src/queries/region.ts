import { useQuery } from "react-query";
import { getAllRegions } from "service/region";
import { STALE_TIME } from "utils/constants";

export const useGetAllRegion = () =>
  useQuery(["get-all-region"], () => getAllRegions(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
