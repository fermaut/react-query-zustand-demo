/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  // Agrega aquí otras variables de entorno si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 