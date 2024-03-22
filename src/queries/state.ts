import { useQuery } from "react-query";
import { getStateByPid } from "service/state";
import { STALE_TIME } from "utils/constants";

export const useGetStateByPid = (pid: number) =>
  useQuery(["get-state-by-pid", pid], () => getStateByPid(pid), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
