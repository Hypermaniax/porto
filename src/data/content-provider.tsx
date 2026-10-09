import { useEffect, useState, type ReactNode } from "react"
import { ContentContext, ContentLoadedContext, fallbackContent, fromBackend } from "@/data/content"

// ContentProvider = "pemasok" konten untuk seluruh aplikasi.
// Nilai awalnya data statis (fallback). Setelah request ke
// GET {VITE_API_URL}/api/content selesai, isi diganti data Firestore.
// Pasang di main.tsx, di dalam <BrowserRouter>.
export default function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(fallbackContent)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // VITE_API_URL diatur di .env.local (contoh: http://localhost:3000).
    const baseURL = import.meta.env.VITE_API_URL
    if (!baseURL) return

    let alive = true // guard: buang hasil kalau komponen sudah unmount
    fetch(`${baseURL}/api/content`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`)),
      )
      .then((data) => {
        if (alive) setContent(fromBackend(data))
      })
      .catch((err) => {
        // Gagal (mis. server mati) = bukan bencana: UI tetap tampil
        // memakai data statis. Cukup beri tahu lewat console.
        console.warn("[content] API tidak tersedia, pakai data statis:", err)
      })
      .finally(() => {
        // Siap atau gagal, proses pengambilan selesai -> intro boleh lolos.
        if (alive) setLoaded(true)
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <ContentContext.Provider value={content}>
      <ContentLoadedContext.Provider value={loaded}>{children}</ContentLoadedContext.Provider>
    </ContentContext.Provider>
  )
}
