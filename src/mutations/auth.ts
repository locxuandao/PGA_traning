import { useMutation } from "react-query";
import { login, register } from "service/auth";
import { ILoginFormModel, IRegisterModel } from "types/Authentication";

export const useLogin = () =>
  useMutation((payload: ILoginFormModel) => login(payload));

export const useRegister = () =>
  useMutation((payload: IRegisterModel) => register(payload));
