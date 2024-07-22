import { AxiosResponse } from 'axios';

export interface ICaptchaResponse extends AxiosResponse {
  success: boolean;
  challenge_ts: string;
}

export interface ICaptchaData {
  success: boolean;
  challenge_ts: string;
}
