import { useQuery } from "react-query";

import { getAllProduct, getProductById } from "service/product";
import { STALE_TIME } from "utils/constants";

export const useGetAllProduct = () =>
  useQuery(["get-all-product"], () => getAllProduct(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useGetProductById = (productId: number) =>
  useQuery(["get-product-by-id", productId], () => getProductById(productId), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
