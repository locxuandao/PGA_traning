import { useMutation } from "react-query";
import { login } from "service/auth";
import { ILoginFormModel } from "types/Authentication";

export const useLogin = () =>
  useMutation((payload: ILoginFormModel) => login(payload));
