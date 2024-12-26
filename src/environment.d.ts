declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_OPENAI_API_KEY: string;
    }
  }
} 