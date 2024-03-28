import { useMutation } from "react-query";
import { deleteProductById } from "service/product";

export const useDeleteProduct = () =>
  useMutation((payload: number) => deleteProductById(payload));
