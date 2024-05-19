import { UserBaseData } from "./userBaseData.interface";

export interface CheckTokenResponse {
  user:  UserBaseData;
  token: string;
  expirationToken: string;
}
