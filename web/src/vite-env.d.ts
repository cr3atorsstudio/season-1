/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_ALCHEMY_ID: string;
  VITE_API_URL: string;
  VITE_CONTRACT_ADDRESS: string;
  SENTRY_AUTH_TOKEN: string;
  VITE_SENTRY_DSN: string;
  VITE_BUCKET_NAME: string;
}

interface Window {
  ethereum: any;
}
