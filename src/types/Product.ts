import { User } from "./User";

export interface ProductModel {
  id: number;
  status: string;
  currency: string;
  fundingMethod: string;
  total: number;
  order: string;
  client: string;
  invoice: string;
  createdBy: User;
  createAt: string;
  upadteAt: string;
}
