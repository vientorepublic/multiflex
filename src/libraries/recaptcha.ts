import axios from 'axios';
import { ICaptchaData, ICaptchaResponse } from 'src/types/recaptcha';

const secretKey = process.env.RECAPTCHA_SECRET;

class recaptcha {
  public async verify(token: string, ip: string): Promise<ICaptchaData> {
    try {
      const params = new URLSearchParams();
      params.append('secret', secretKey);
      params.append('response', token);
      params.append('remoteip', ip);
      const res = await axios.get<ICaptchaResponse>(
        'https://www.google.com/recaptcha/api/siteverify',
        { params },
      );
      return {
        success: res.data.success,
        challenge_ts: res.data.challenge_ts,
      };
    } catch (err) {
      return {
        success: false,
        challenge_ts: new Date().toISOString(),
      };
    }
  }
}

export const reCAPTCHA = new recaptcha();
