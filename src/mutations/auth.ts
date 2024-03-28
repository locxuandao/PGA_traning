import { useMutation } from "react-query";
import { login, register } from "service/auth";
import { LoginFormModel, RegisterModel } from "types/Authentication";

export const useLogin = () =>
  useMutation((payload: LoginFormModel) => login(payload));

export const useRegister = () =>
  useMutation((payload: RegisterModel) => register(payload));
