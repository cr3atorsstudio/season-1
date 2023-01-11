/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_ALCHEMY_ID: string;
  VITE_API_URL: string;
  VITE_CONTRACT_ADDRESS: string;
}

interface Window {
  ethereum: any;
}