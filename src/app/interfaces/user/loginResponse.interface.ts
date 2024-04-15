import { UserBaseData } from "./userBaseData.interface";

export interface LoginResponse {
  user:  UserBaseData;
  token: string;
  expirationToken: string;
}
