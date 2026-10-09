/// <reference types="vite/client" />

// File ini memberi tahu TypeScript tentang variabel environment kita,
// supaya "import.meta.env.VITE_API_URL" dikenali dan tidak error.

interface ImportMetaEnv {
  readonly VITE_API_URL: string

  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
