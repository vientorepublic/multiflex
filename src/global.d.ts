declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USE_CLUSTER: string;
      CURRENT_GIT_SHA: string;
      CURRENT_GIT_BRANCH: string;
      UPLOAD_PATH: string;
      RECAPTCHA_SECRET: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      EXPIRES: string;
    }
  }
}

export {};
