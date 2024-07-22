declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CURRENT_GIT_SHA: string;
      CURRENT_GIT_BRANCH: string;
    }
  }
}

export {};
