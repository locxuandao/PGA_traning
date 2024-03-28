import { Region } from "./Region";
import { State } from "./State";

export interface LoginFormModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: Region;
  state: State;
}

export interface RegisterPayload {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: number;
  state: number;
}

export interface RegistervalidateForm {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: string;
  state: string;
}
