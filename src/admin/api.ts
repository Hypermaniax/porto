// api.ts = "paket pos" untuk halaman admin.
//
// Semua cara berkomunikasi dengan backend berada di sini, jadi
// AdminPage/ProjectForm cukup memanggil fungsi-fungsi simpel.
//
// Login memakai endpoint milik BE sendiri (POST /api/admin/login):
// user admin tersimpan di Firestore (password berupa hash bcrypt),
// dan BE yang menandai sesi. Token sesi berlaku 7 hari.

// URL backend, contoh "http://localhost:3000". Vite menyuntikkan
// variabel berawalan VITE_ otomatis dari .env.local.
const API_URL = import.meta.env.VITE_API_URL ?? ""

// Data Cloudinary untuk tombol "unggah gambar" (unsigned preset ->
// tidak perlu kunci rahasia di sisi browser).
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? ""
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? ""

const TOKEN_KEY = "porto_admin_token"

// Token disimpan di localStorage supaya tetap login walau halaman
// di-refresh (hilang ±1 jam bersamaan dengan masa berlaku token).
export function setStoredToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

// adminFetch = fetch + header Authorization + pesan error berbahasa
// yang rapi dari body JSON backend ({"error": "..."}).
export async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  })

  const body = (await res.json().catch(() => null)) as
    | { error?: string }
    | null
  if (!res.ok) {
    throw new Error(body?.error ?? `Server menjawab ${res.status}`)
  }
  return body as T
}

// AdminMe = jawaban GET /api/admin/me.
// dev = true berarti mode setup: belum ada user admin di database.
export type AdminMe = { uid: string; dev: boolean }

// loginAdmin memanggil endpoint login milik backend.
// Berhasil -> kembalikan token sesi. Gagal -> lempar Error berisi
// pesan yang sudah dirapikan dari pesan BE.
export async function loginAdmin(email: string, password: string): Promise<string> {
  const body = await adminFetch<{ token: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  return body.token
}

// uploadToCloudinary mengunggah file gambar tanpa kunci rahasia
// (unsigned preset `porto_image`). Berhasil -> kembalikan URL
// "https://res.cloudinary.com/..." yang siap disimpan ke database.
export async function uploadToCloudinary(file: File): Promise<string> {
  const form = new FormData()
  form.append("file", file)
  form.append("upload_preset", UPLOAD_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form },
  )
  const body = (await res.json().catch(() => ({}))) as
    | { secure_url?: string; error?: { message?: string } }
    | null

  if (!res.ok || !body?.secure_url) {
    throw new Error(body?.error?.message ?? "unggah gagal")
  }
  return body.secure_url
}
