import { AxiosResponse } from "axios";

import { http } from "utils/api/http";
import { ProductModel } from "types/Product";

export const getAllProduct = async (): Promise<ProductModel[]> => {
  const response: AxiosResponse = await http.get(`/product`);

  return response?.data?.data;
};

export const getProductById = async (
  productId: number,
): Promise<ProductModel> => {
  const response: AxiosResponse = await http.get(`/product/${productId}`);

  return response?.data?.data;
};

export const deleteProductById = async (
  productId: number,
): Promise<ProductModel> => {
  const response: AxiosResponse = await http.delete(`/product/${productId}`);

  return response?.data?.data;
};
